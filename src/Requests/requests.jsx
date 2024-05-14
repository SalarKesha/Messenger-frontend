import axios from "axios";
import { useAuthDispatch } from "../Context/auth-context"
import { actionTypes } from "../Context/reducer";
import { toast } from "react-toastify";

export const socketBaseUrl = process.env.REACT_APP_socketBaseUrl
export const BaseUrl = process.env.REACT_APP_BaseUrl


export function notify(message, type) {
    if (type === 'success') {
        toast.success(message)
    } else if (type === 'error') {
        toast.error(message)
    } else {
        toast.info(message)
    }
}


export function getSocketReq(uri) {
    return `${socketBaseUrl}${uri}?token=${localStorage.getItem('access_token')}`
}

export const useRequest = () => {
    const authDispatch = useAuthDispatch();
    // const authState = useAuthState()
    // const accessToken = authState.token
    // const [accessToken, setAccessToken] = useState(authState.token);
    // useEffect(() => {
    //     setAccessToken(authState.token);
    // }, [authState]);
    // console.log(authState);
    const getReq = async (uri) => {
        const url = BaseUrl + uri
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                authDispatch({ type: actionTypes.LOGOUT });
                // notify('Log in to your account', 'info')
            }
            else if (error.response && error.response.status === 403) {
                notify('Permission denied', 'error')
            }
            else if (error.response && error.response.status === 404) {
                notify('Not found', 'error')
            }
            else if (error.response && error.response.status === 405) {
                notify('Not allowed', 'error')
            }
            else if (error.response && error.response.status === 429) {
                notify(error.response.data.detail, 'error')
            }
            else if (error.response && error.response.status === 500) {
                notify('server error', 'error')
            }
            else if (error.message === 'Network Error') {
                notify('Connection error', 'error')
            }
            throw error;
        }
    };

    const postReq = async (uri, data) => {
        const url = BaseUrl + uri
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post(url, data, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                authDispatch({ type: actionTypes.LOGOUT });
                // notify('Log in to your account', 'info')
            }
            else if (error.response && error.response.status === 403) {
                notify('Permission denied', 'error')
            }
            else if (error.response && error.response.status === 404) {
                notify('Not found', 'error')
            }
            else if (error.response && error.response.status === 405) {
                notify('Not allowed', 'error')
            }
            else if (error.response && error.response.status === 429) {
                notify(error.response.data.detail, 'error')
            }
            else if (error.response && error.response.status === 500) {
                notify('server error', 'error')
            }
            else if (error.message === 'Network Error') {
                notify('Connection error', 'error');
            }
            throw error;
        }
    };
    const deleteReq = async (uri) => {
        const url = BaseUrl + uri
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.delete(url, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                authDispatch({ type: actionTypes.LOGOUT });
                // notify('Log in to your account', 'info')
            }
            else if (error.response && error.response.status === 403) {
                notify('Permission denied', 'error')
            }
            else if (error.response && error.response.status === 404) {
                notify('Not found', 'error')
            }
            else if (error.response && error.response.status === 405) {
                notify('Not allowed', 'error')
            }
            else if (error.response && error.response.status === 429) {
                notify(error.response.data.detail, 'error')
            }
            else if (error.response && error.response.status === 500) {
                notify('server error', 'error')
            }
            else if (error.message === 'Network Error') {
                notify('Connection error', 'error');
            }
            throw error;
        }
    }
    const patchReq = async (uri, data) => {
        const url = BaseUrl + uri
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.patch(url, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                authDispatch({ type: actionTypes.LOGOUT });
                // notify('Log in to your account', 'info')
            }
            else if (error.response && error.response.status === 403) {
                notify('Permission denied', 'error')
            }
            else if (error.response && error.response.status === 404) {
                notify('Not found', 'error')
            }
            else if (error.response && error.response.status === 405) {
                notify('Not allowed', 'error')
            }
            else if (error.response && error.response.status === 429) {
                notify(error.response.data.detail, 'error')
            }
            else if (error.response && error.response.status === 500) {
                notify('server error', 'error')
            }
            else if (error.message === 'Network Error') {
                notify('Connection error', 'error');
            }
            throw error;
        }
    }
    return { getReq, postReq, deleteReq, patchReq };
};
