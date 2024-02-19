import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { VideoPlayer } from '../index.js'
import videoService from '../../backendapi/videoapi.js'
import userService from '../../backendapi/userapi.js'
import { isTokenValid, refreshedTokens } from '../../utils/tokenVerify.js'
import { timeSinceUpload, secondsToTime } from '../../utils/timeConversion.js'

export default function Video() {
    const { channel, videoId } = useParams()
    const [video, setVideo] = useState({})
    const [user, setUser] = useState({})
    const [views, setViews] = useState('0')
    const [subscribers, setSubscribers] = useState('0')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [loggedInAvatar, setLoggedInAvatar] = useState(null)
    const [commentsList, setCommentsList] = useState([])
    const [comment, setComment] = useState('')
    const [likesCount, setLikesCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const navigator = useNavigate()

    const channelId = channel.split('+')[1]

    const getVideo = async () => {
        const response = await videoService.getVideo(videoId)
        setVideo(response.data)
        setUser(response.data.user)
        console.log(response.data)
    }

    const postView = async () => {
        const viewsResponse = await videoService.postView(videoId)
        const viewsNumber = viewsResponse.data
        console.log(viewsNumber)
        if (viewsNumber >= 100000) {
            const d = viewsNumber / 1000000
            setViews(`${d.toFixed(1)}M`)
        } else if (viewsNumber >= 1000) {
            const d = viewsNumber / 1000
            setViews(`${d.toFixed(1)}K`)
        } else {
            setViews(String(viewsNumber))
        }
    }

    const getSubscribers = async () => {
        const subscribersResponse = await videoService.getSubscribers(channelId)
        console.log(subscribersResponse)
        const subscribersNumber = subscribersResponse.data.subscribers
        setIsSubscribed(subscribersResponse.data.isSubscribed)
        console.log(subscribersNumber)
        if (subscribersNumber >= 100000) {
            const d = subscribersNumber / 1000000
            setSubscribers(`${d.toFixed(1)}M`)
        } else if (subscribersNumber >= 1000) {
            const d = subscribersNumber / 1000
            setSubscribers(`${d.toFixed(1)}K`)
        } else {
            setSubscribers(String(subscribersNumber))
        }
    }

    const postSubscribe = async () => {
        const subscribeResponse = await videoService.subscribeChannel(channelId)
        console.log(subscribeResponse)
        if (subscribeResponse.success) {
            getSubscribers()
        }
    }

    const postUnsubscribe = async () => {
        const unsubscribeResponse = await videoService.unsubscribeChannel(channelId)
        console.log(unsubscribeResponse)
        if (unsubscribeResponse.success) {
            getSubscribers()
        }
    }

    const loggedinUserAvatar = async () => {
        const response = await userService.loggedInUserAvatar()
        console.log(response)
        setLoggedInAvatar(response.data)
    }

    const getComments = async () => {
        const response = await videoService.getComments(videoId)
        console.log(response)
        setCommentsList(response.data)
    }

    const postComment = async (e) => {
        e.preventDefault()
        const response = await videoService.postComment(videoId, comment)
        console.log(response)
        setComment('')
        getComments()
    }

    const videoLikes = async () => {
        const response = await videoService.videoLikes(videoId)
        console.log(response)
        setLikesCount(response.data.likesCount)
        setIsLiked(response.data.isLiked)
    }

    const likeVideo = async () => {
        const response = await videoService.likeVideo(videoId)
        console.log(response)
        videoLikes()
    }

    const unlikeVideo = async () => {
        const response = await videoService.unlikeVideo(videoId)
        console.log(response)
        videoLikes()
    }

    useEffect(async () => {
        // if (!isTokenValid()) {
        //     const response = await refreshedTokens()
        //     if (response) {
        //         alert('Please refresh your page')
        //     } else {
        //         alert('You are not logged in')
        //     }
            
        //     navigator('/')
        // }
        getVideo()
        postView()
        getSubscribers()
        loggedinUserAvatar()
        getComments()
        videoLikes()
    }, [])

    return (
        <div className="flex py-2">
        {/* First column (2/3 width) */}
            <div className="w-2/3 px-6">
                <VideoPlayer videoSrc={video.videoUrl} />
                <div className='text-white py-3'>
                    <h1 className='text-2xl font-bold'>{video.title}</h1>
                    {/* <p className='my-2'>{views} views</p> */}
                    <div className='flex'>
                        <div className='w-1/3 my-4 flex my-auto'>
                            <img className='w-10 h-10 rounded-full' src={user.avatar} alt="" />
                            <div className='mx-3'>
                                <Link className='text-lg font-semibold text-gray-200'>{user.username}</Link>
                                <p className='text-sm text-gray-400'>{subscribers} Subscribers</p>
                            </div>
                        </div>
                        <div className='w-1/3 my-4'>
                            {isSubscribed ? (
                                <button className='py-2 px-6 bg-gray-600 hover:bg-gray-500 text-gray-300 font-medium rounded-3xl'
                                onClick={postUnsubscribe}
                            >Subscribed</button>
                            ) : (
                                <button className='py-2 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-3xl'
                                onClick={postSubscribe}
                            >Subscribe</button>
                            )}
                        
                        </div>
                        <div className='w-1/3 my-4'>
                            {isLiked ? (
                                <button className='py-2 px-6 bg-gray-600 hover:bg-gray-500 text-gray-300 font-medium rounded-3xl'
                                onClick={unlikeVideo}
                            >Liked {likesCount}</button>
                            ) : (
                                <button className='py-2 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-3xl'
                                onClick={likeVideo}
                            >Like {likesCount}</button>
                            )}
                        
                        </div>
                    </div>
                    <div className='px-2 bg-gray-600 rounded-md'>
                        <p className='text-md font-semibold text-gray-200'>{views} views {timeSinceUpload(video.createdAt)}</p>
                        <p className='py-2'>{video.description}</p>
                    </div>

                    <div class="max-w-4xl mt-8">
                    {/* <!-- Comment Form Container --> */}
                        <form class="flex space-x-4">
                            {/* <!-- Avatar --> */}
                            <img src={loggedInAvatar} alt="Avatar" class="w-10 h-10 rounded-full" />

                            {/* <!-- Input Field --> */}
                            {/* <!-- Input field with bottom border --> */}
                            <input type="text" 
                            placeholder="Enter your comment..." 
                            class="bg-gray-700 w-full border-b border-gray-300 focus:outline-none"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            />


                            {/* <!-- Submit Button --> */}
                            <button type="submit" 
                            class="bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-3xl"
                            onClick={postComment}
                            >Comment</button>
                        </form>
                    </div>

                    <div className="max-w-xl mt-8">
                        <h3 className='text-xl font-bold mb-5'>{commentsList.length} Comments</h3>
                        {/* <!-- Single comment --> */}
                        {commentsList.map((comment) => (
                            <div className="flex space-x-4 items-start" key={comment.id}>
                                {/* <!-- Commenter's avatar --> */}
                                <img src={comment.user.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />

                                {/* <!-- Comment content --> */}
                                <div>
                                    {/* <!-- Commenter's username --> */}
                                    <div className="font-semibold text-gray-300 flex items-center gap-2">{comment.user.username}
                                        <div className="text-gray-400 text-xs">{timeSinceUpload(comment.createdAt)}</div>
                                    </div>
                                    {/* <!-- Comment text --> */}
                                    <p className="text-white font-thin">{comment.comment}</p>
                                    {/* <!-- Timestamp --> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Second column (1/3 width) */}
            <div className="w-1/3">
                <div className="flex my-3">
                    <div className="w-2/3">
                        <div className="relative max-w-md rounded-lg overflow-hidden cursor-pointer">
                            {/* Image */}
                            <img className="w-48 xs:w-16 sm:h-28 xs:h-20 object-cover rounded-lg" src={"http://res.cloudinary.com/owaisamu20/image/upload/v1707903574/thumbnail_upload/yrgedp4qhn1vrtfzz2qw.jpg"} alt="Card Image" />

                            {/* Overlay */}
                            <div className="absolute bottom-1 right-2 px-1 rounded-md bg-gray-700">
                                <p className="text-xs font-semibold text-white">{secondsToTime(90)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-white font-semibold">Title Title Title Title Title Title Title Title Title</p>
                        <p className='text-sm text-gray-300'>@owais</p>
                        <p className='text-sm text-gray-300'>12K views</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
