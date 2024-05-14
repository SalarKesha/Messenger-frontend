import React from 'react'
import Messenger from './Pages/Messenger'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute'
import VideoCall from './Pages/VideoCall'
import AudioCall from './Pages/AudioCall'
export default function App() {
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route element={<PrivateRoute />} >
					<Route path='/' element={<Messenger />} />
					<Route path='/video-call/:id' element={<VideoCall />} />
					<Route path='/audio-call/:id' element={<AudioCall />} />
				</Route>
			</Routes>
		</>
	)
}
