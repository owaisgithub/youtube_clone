import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import videoService from "../../backendapi/videoapi.js"
import { Card } from '../index.js'
import { Sidebar } from '../index.js'
import { isTokenExist, isTokenValid } from '../../utils/tokenVerify.js'

export default function Home() {
  const [videosList, setVideosList] = useState([])
  const location = useLocation()

  const currentPath = location.pathname

  const makeViews = (views) => {
    if (views >= 1000000) {
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
  useEffect(() => {
    if (isTokenExist()) {
      if (!isTokenValid()) {
        const response = refreshedTokens()
        console.log(response)
      }
    }
    getAllVideos()
    console.log(videosList)
  }, [])

  return (
    <div className='flex flex-1 h-screen'>
        {/* Left Section */}
        <Sidebar currentPath={currentPath} />

        {/* Right Section */}
        <main className="flex-grow p-4 ml-48">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gab-4">
            {videosList.map((video) => (
              <Link key={video.id} to={`/video-play/${video.user.username}+${video.user.userId}/${video.id}`}>
                <Card
                  imageUrl={video.thumbnailUrl}
                  title={video.title}
                  views={makeViews(video.views)}
                  timestamp={video.duration}
                  profile={video.user.avatar}
                  chennelName={video.user.username}
                  timeUpload={video.createdAt}
                />
              </Link>
            ))}
          </div>
        </main>
    </div>
  )
}
