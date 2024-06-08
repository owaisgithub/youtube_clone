import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import videoService from "../../api/videoapi.js"
import { Card } from '../index.js'
import { Sidebar } from '../index.js'
import { isTokenExist, isTokenValid, refreshedTokens } from '../../utils/tokenVerify.js'
import { logout } from '../../features/auth/authSlice.js'

export default function Home() {
	const [videosList, setVideosList] = useState([])
	const [startTime, setStartTime] = useState(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	const currentPath = location.pathname

	const hours = new Date()

	const makeViews = (views) => {
		if (views >= 1000000000000) {
			return (views / 1000000000000).toFixed(1) + 'T'
		}else if (views >= 1000000000) {
			return (views / 1000000000).toFixed(1) + 'B'
		}else if (views >= 1000000) {
			return (views / 1000000).toFixed(1) + 'M'
		} else if (views >= 1000) {
			return (views / 1000).toFixed(1) + 'K'
		} else {
			return views
		}
	}

	const getAllVideos = async () => {
		const response = await videoService.getVideos()
		setVideosList(response.data)
		const viewsNumber = response.data.views
		console.log(viewsNumber)

		console.log("Data set")
	}

	// console.log(new Date())
	useEffect(() => {
		// if (!isTokenExist() || !isTokenValid()) {
		// 	dispatch(logout())
		// 	navigate('/login')
		// }
		setStartTime(hours.getTime())
		getAllVideos()
		console.log(videosList)
		// return () => {
		// 	const endTime = hours.getHours()
		// 	const stayTime = endTime - startTime
		// 	console.log(`Stay Time: ${stayTime}`)
		// }
	}, [])

	
	return (
		<div className='flex flex-1 h-screen'>
			{/* Left Section */}
			<Sidebar currentPath={currentPath} />

			{/* Right Section */}
			<main className="flex-grow p-4 ml-48">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gab-4">
					{videosList.map((video) => (
						<Link key={video._id} to={`/video-play/${video.channel.channelId}&${video.channel.channelHandle}/${video._id}`}>
							<Card
								imageUrl={video.thumbnailUrl}
								title={video.title}
								views={makeViews(video.views)}
								timestamp={video.duration}
								profile={video.channel.channelAvatarUrl}
								chennelName={video.channel.channelName}
								timeUpload={video.createdAt}
							/>
						</Link>
					))}
				</div>
			</main>
		</div>
	)
}
