import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../../features/auth/authSlice";
import getAuthHeaders from "../../utils/authHeader"
import authService from "../../backendapi/userapi";

function Header() {
    const isAuthenticated = useSelector(state => state.isAuthenticated)

    const [isLogin, setLogin] = useState(false)
    const [user, setUser] = useState({})

    const dispatch = useDispatch()

    const logoutUser = async () => {
        const logoutUser = await authService.logout()
        console.log(logoutUser)
        if (logoutUser.success) {
          dispatch(logout())
        }
    }

    const toggleDropdown = async () => {
      const userResponse = await authService.userProfile()
      setUser(userResponse.data)
      console.log(userResponse.data)
      const dropdownMenu = document.getElementById('dropdown-menu');
      dropdownMenu.classList.toggle('hidden');
    }


    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
          const accessToken = localStorage.getItem('accessToken')
          const refreshToken = localStorage.getItem('refreshToken')
          const user = localStorage.getItem('user')
          const tokenExpiry = localStorage.getItem('tokenExpiry')
          const userAvatar = localStorage.getItem('userAvatar')
          dispatch(login({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
            tokenExpiry: tokenExpiry,
            userAvatar: userAvatar
          }))
          setLogin(true);
        }

        if (isAuthenticated) {
          setLogin(true)
        }

    }, [isAuthenticated, login, setLogin])

    return (
      <nav className="bg-gray-900 px-5 py-2 fixed w-full top z-10">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left section */}
          <div className="text-white font-bold text-xl">
            <Link to="/"><span className="text-white">You</span><span className="text-red-500">Tube</span></Link>
          </div>

          {/* Middle section */}
          <div className="flex-grow flex items-center justify-center">
            <input type="text"
                placeholder="Search"
                className="px-3 py-2 w-1/2 rounded-l-3xl bg-gray-800 border border-gray-700 focus:outline-none text-white placeholder-gray-500"
            />
            <i className="fas fa-search text-white bg-gray-700 border-gray-600 border px-6 py-3 rounded-r-3xl cursor-pointer"></i>
          </div>

          {/* Right section */}
          <div className="flex">
            <Link to="/upload-video"><i className="fas fa-video text-white"></i></Link>
            {isLogin || isAuthenticated ? (
              <div className="relative" >
                <button className="text-white" onClick={toggleDropdown}>
                  <img src={localStorage.getItem('userAvatar')} alt="Profile Image" className="h-8 w-8 rounded-full ml-10" />
                </button>
                <div id="dropdown-menu" className="hidden absolute right-0 w-64 bg-gray-900 rounded-md shadow-lg text-white py-3">
                  <div className="flex py-5 px-4">
                    <div className="w-1/4">
                      <img src={user.avatar} className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="w-3/4">
                      <p className="leading-none text-lg text-gray-200">{user.fullname}</p>
                      <p className="text-gray-200">{user.username}</p>
                    </div>
                  </div>
                  <hr className="border-gray-500 py-1" />
                  {user.isChannel ? (
					 <Link to={`/channel/${user.channelId}?${user.channelHandle}`} className="block px-4 py-2 cursor-pointer hover:bg-gray-800 hover:mr-2 mb-2">Go To Your Channel</Link>
				  ) : (
                     <Link to="/create-channel" className="block px-4 py-2 cursor-pointer hover:bg-gray-800 hover:mr-2 mb-2">Create Your Channel</Link>
                  )}
                  <hr className="border-gray-500 py-1" />
                  <p className="block px-4 cursor-pointer py-2 hover:bg-gray-800 hover:mr-2" onClick={logoutUser}>Logout</p>
                </div>
              </div>
            ): (
              <Link className="text-white ml-10" to="/login">Log In</Link>
            )}
          </div>
        </div>
      </nav>
    )
}

export default Header;