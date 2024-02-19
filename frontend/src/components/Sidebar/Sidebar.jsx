import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({currentPath}) {
  return (
    <aside className="w-1/6 p-4 fixed h-full overflow-y-auto text-white">
        <ul>
            {currentPath === '/' ? (
                <li className='bg-gray-600 hover:bg-gray-500 rounded-md py-2'>
                    <Link className='px-3 font-semibold' to="/">Home</Link>
                </li>
            ) : (
                <li className='hover:bg-gray-600 rounded-md py-2'>
                    <Link className='px-3 font-semibold' to="/">Home</Link>
                </li>
            )}
            {currentPath === '/subscription' ? (
                <li className='bg-gray-600 hover:bg-gray-500 rounded-md py-2'>
                    <Link className='px-3 font-semibold' to="/subscription">Subscriptions</Link>
                </li>
            ) : (
                <li className='hover:bg-gray-600 rounded-md py-2'>
                    <Link className='px-3 font-semibold' to="/subscription">Subscriptions</Link>
                </li>
            )}
            <hr className='my-2 border-gray-400' />
            <li className='hover:bg-gray-600 rounded-md py-2'>
                <Link className='px-3 font-semibold'>Your channel</Link>
            </li>
        </ul>
    </aside>
  )
}
