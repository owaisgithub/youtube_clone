import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice.js'
import channelService from '../../backendapi/channelapi'
import { isTokenExist, isTokenValid } from '../../utils/tokenVerify.js'


export default function Sidebar({currentPath}) {
    const navigate = useNavigate()
    const [channel, setChannel] = useState({})
    const dispatch = useDispatch()

    const navigateHome = () => {
        navigate('/')
    }

    const navigateSubscription = () => {
        navigate('/subscription')
    }

    const getChannelDetails = async () => {
        const channelResponse = await channelService.getChannelDetails()
        console.log(channelResponse)
        if (channelResponse.status >= 400) {
            console.log("I am checking the token exiration")
            return null
        }
        setChannel(channelResponse.data)
        console.log(channel)
    }

    useEffect(() => {
        if (!isTokenExist() || !isTokenValid()) {
            dispatch(logout())
			navigate('/login')
		}
        getChannelDetails()
    }, [])

    return (
        <aside className="w-1/6 p-4 fixed h-full overflow-y-auto text-white">
            <ul>
                {currentPath === '/' ? (
                    <li className='bg-gray-800 hover:bg-gray-700 rounded-md py-2 cursor-pointer'>
                        <Link className='px-3 font-semibold' to="/">Home</Link>
                    </li>
                ) : (
                    <li className='hover:bg-gray-700 rounded-md py-2 cursor-pointer' onClick={navigateHome}>
                        <Link className='px-3 font-semibold' to="/">Home</Link>
                    </li>
                )}
                {currentPath === '/subscription' ? (
                    <li className='bg-gray-800 hover:bg-gray-700 rounded-md py-2'>
                        <Link className='px-3 font-semibold' to="/subscription">Subscriptions</Link>
                    </li>
                ) : (
                    <li className='hover:bg-gray-800 rounded-md py-2 cursor-pointer' onClick={navigateSubscription}>
                        <Link className='px-3 font-semibold' to="/subscription">Subscriptions</Link>
                    </li>
                )}
                <hr className='my-2 border-gray-400' />
                {currentPath === `/channel/${channel._id}` ? (
                    <li className='bg-gray-800 hover:bg-gray-700 rounded-md py-2'>
                        <Link className='px-3 font-semibold' to={`/channel/${channel.id}`}>Your channel</Link>
                    </li>
                ) : (
                    <li className='hover:bg-gray-700 rounded-md py-2 cursor-pointer'>
                        <Link className='px-3 font-semibold' to={`/channel/${channel._id}?${channel.channelHandle}`}>Your channel</Link>
                    </li>
                )}
            </ul>
        </aside>
    )
}
