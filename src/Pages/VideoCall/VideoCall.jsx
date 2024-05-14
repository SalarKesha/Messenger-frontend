import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../Components/Layout'
import '../../assets/styles/videoCall.css'
import { useParams } from 'react-router-dom'
import { getSocketReq, useRequest } from '../../Requests/requests'
import { useAuthState } from '../../Context/auth-context'
import { useNavigate } from 'react-router-dom'
import calleeRingtone from '../../assets/audio/ring.mp3'
import callerRingtone from '../../assets/audio/ring2.mp3'
const callStatus = {
    PENDING: 'pending',
    CANCEL: 'cancel',
    REJECT: 'reject',
    END_REQUEST: 'end_request',
    ACCEPT: 'accept',
    FINISH: 'finish'
}
export default function VideoCall() {
    const navigate = useNavigate()
    const authState = useAuthState()
    const { getReq } = useRequest()
    const [call, setCall] = useState()
    const [status, setStatus] = useState(callStatus.PENDING)
    const { id } = useParams()
    const socketRef = useRef(null)
    const callerRingRef = useRef()
    const calleeRingRef = useRef()
    const ringtimeoutRef = useRef()
    const videoSendRef = useRef()
    const videoReceiveRef = useRef()
    const streamRef = useRef()
    const peerConnectionRef = useRef(new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun4.l.google.com:19302' },
        ]
    }))
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true })
        .then(stream => {
            streamRef.current = stream
            const [track] = stream.getVideoTracks()
            peerConnectionRef.current.addTrack(track, stream)
            videoSendRef.current.srcObject = stream
        })
        .catch(error => {
            console.error('Error accessing media devices:', error);
        });
    useEffect(() => {
        getReq(`call/${id}`).then(({ data, status }) => {
            setCall(data)
        }).catch(() => navigate(-1))
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => {
                    track.stop()
                });
                streamRef.current.getAudioTracks().forEach(function (track) {
                    track.stop();
                });
                streamRef.current.getVideoTracks().forEach(function (track) {
                    track.stop();
                });
            }
            if (peerConnectionRef) {
                peerConnectionRef.current.close()
            }
            videoSendRef.current = null
            videoReceiveRef.current = null
        }
    }, [])
    useEffect(() => {
        if (id) {
            socketRef.current = new WebSocket(getSocketReq(`call/${id}/`))
            socketRef.current.onmessage = (e) => {
                const data = JSON.parse(e.data)
                switch (data.message_type) {
                    case callStatus.CANCEL:
                        stopAudios()
                        setStatus(callStatus.CANCEL);
                        navigate('/')
                        break;
                    case callStatus.REJECT:
                        stopAudios()
                        setStatus(callStatus.REJECT);
                        navigate('/')
                        break;
                    case callStatus.END_REQUEST:
                        stopAudios()
                        setStatus(callStatus.END_REQUEST);
                        navigate('/')
                        break;
                    case callStatus.ACCEPT:
                        clearTimeout(ringtimeoutRef.current)
                        stopAudios()
                        setStatus(callStatus.ACCEPT);

                        break;
                    case callStatus.FINISH:
                        setStatus(callStatus.FINISH);
                        navigate('/')
                        break;
                    case 'forward':
                        switch (data.content_type) {
                            case 'offer':
                                if (data.sender_id !== authState.user) {
                                    peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.payload));
                                    peerConnectionRef.current.createAnswer()
                                        .then(answer => {
                                            peerConnectionRef.current.setLocalDescription(answer);
                                            sendMessage({
                                                message_type: 'forward',
                                                content_type: 'answer',
                                                sender_id: authState.user,
                                                payload: answer
                                            });
                                        })
                                        .catch(error => {
                                            console.error('Error creating answer:', error);
                                        });
                                }
                                break;
                            case 'answer':
                                if (data.sender_id !== authState.user) {
                                    peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.payload));
                                }
                                break;
                            case 'candidate':
                                if (data.sender_id !== authState.user) {
                                    const candidate = new RTCIceCandidate(data.payload);
                                    peerConnectionRef.current.addIceCandidate(candidate);
                                }
                                break;
                            default:
                                console.log('Invalid');
                        }
                        break;
                    default:
                        console.error('invalid message type');
                }
            }
            socketRef.current.onclose = () => {
                console.log('vc socket closed');
            }
            socketRef.current.onopen = () => {
                console.log('vc socket opened');
            }
        }
        return () => {
            if (socketRef.current) {
                socketRef.current.close()
            }
        }
    }, [])
    useEffect(() => {
        if (call) {
            if (call.caller.id === authState.user) {
                callerRingRef.current.play()
            } else {
                calleeRingRef.current.play()
            }
            if ("vibrate" in navigator) {
                navigator.vibrate(1000);
            }
            ringtimeoutRef.current = setTimeout(() => {
                callerRingRef.current.pause()
                calleeRingRef.current.pause()
                setStatus(callStatus.END_REQUEST)
                navigate('/')
            }, 1000 * 30)
            peerConnectionRef.current.onicecandidate = (e) => {
                if (e.candidate) {
                    sendMessage({
                        message_type: 'forward',
                        content_type: 'candidate',
                        sender_id: authState.user,
                        payload: e.candidate
                    })
                }
            }
            peerConnectionRef.current.ontrack = (e) => {
                videoReceiveRef.current.srcObject = e.streams[0];
            };
            return () => {
                if (peerConnectionRef.current) {
                    peerConnectionRef.current.onicecandidate = null;
                    peerConnectionRef.current.ontrack = null;
                }
                stopAudios()
                clearTimeout(ringtimeoutRef.current)
            }
        }
    }, [call])
    const sendMessage = (data) => {
        if (socketRef.current) {
            socketRef.current.send(JSON.stringify(data))
        }
    }
    const handleCancel = () => {
        stopAudios()
        sendMessage({ message_type: callStatus.CANCEL })
        navigate('/')
    }
    const handleReject = () => {
        stopAudios()
        sendMessage({ message_type: callStatus.REJECT })
        navigate('/')
    }
    const handleAccept = () => {
        stopAudios()
        peerConnectionRef.current.createOffer().then(offer => {
            peerConnectionRef.current.setLocalDescription(offer);
            sendMessage({
                message_type: 'forward',
                content_type: 'offer',
                sender_id: authState.user,
                payload: offer
            });
        }).catch(error => {
            console.error('Error creating offer:', error);
        });
        sendMessage({ message_type: callStatus.ACCEPT })
    }
    const handleFinish = () => {
        sendMessage({ message_type: callStatus.FINISH })
        navigate('/')
    }
    const stopAudios = () => {
        if (callerRingRef.current) {
            callerRingRef.current.pause()
        }
        if (calleeRingRef.current) {
            calleeRingRef.current.pause()
        }
    }
    return (
        <Layout>
            {call &&
                <div className="video-call-container">
                    <div className='audio-container'>
                        <audio ref={calleeRingRef} id="calleeRing" loop>
                            <source src={calleeRingtone} type="audio/mpeg" />
                        </audio>
                        <audio ref={callerRingRef} id="callerRing" loop>
                            <source src={callerRingtone} type="audio/mpeg" />
                        </audio>
                    </div>
                    <div className="user-container">
                        <img src={call.caller.id === authState.user ? call.callee.image : call.caller.image} alt="" className="user-image" />
                        <div className="user-detail">
                            <h2 className="username">{call.caller.id === authState.user ? call.callee.username : call.caller.username}</h2>
                            {/* <span className="user-status">{callee?.status}</span> */}
                        </div>
                    </div>
                    <div className="video-container-wrapper">
                        <div className="video-container">
                            <video autoPlay ref={videoReceiveRef} src="" className="video-receive" poster={call.caller.id === authState.user ? call.callee.image : call.caller.image}></video>
                            <video autoPlay muted ref={videoSendRef} src="" className="video-send" poster={call.caller.id === authState.user ? call.caller.image : call.callee.image}></video>
                        </div>
                        <div className="options-container">
                            {(call.caller.id === authState.user && status === callStatus.PENDING) &&
                                <button className="end-call" onClick={handleCancel}>
                                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m5 5 14 14m-14 0 14-14" stroke="#ee3636" strokeLinecap="round"
                                            strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </button>}
                            {(call.callee.id === authState.user && status === callStatus.PENDING) &&
                                <>
                                    <button className="reject" onClick={handleReject}>
                                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m5 5 14 14m-14 0 14-14" stroke="#fff" strokeLinecap="round"
                                                strokeLinejoin="round" strokeWidth="2" />
                                        </svg>
                                    </button>
                                    <button className="accept" onClick={handleAccept}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path stroke='#fff' d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                        </svg>
                                    </button>
                                </>}
                            {status === callStatus.ACCEPT &&
                                <button className="finish" onClick={handleFinish}>
                                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m5 5 14 14m-14 0 14-14" stroke="#fff" strokeLinecap="round"
                                            strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </button>}
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}
