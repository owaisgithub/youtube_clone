import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../backendapi/userapi';
import { login } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    setLoading(true)
    const data = await authService.login(username, password)
    if (data.success){
        dispatch(login({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          user: data.data.user,
          tokenExpiry: data.data.tokenExpiry,
          userAvatar: data.data.userAvatar
        }))
        console.log(data)
        navigate('/')
    } else {
      console.log(data.data)
      alert(data.message)
    }
    console.log('Login clicked with:', data)
    setLoading(false)
  };

  return (
    <>
    {loading && 
      <div class="flex justify-center items-center mt-8 w-1/2 mx-auto py-3 bg-white rounded-3xl">
        <div class="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    }
    <div className="flex justify-center h-screen my-16">
      <form onSubmit={handleSubmit} className="bg-white shadow-md h-72 rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username/Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username OR Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
        <p>Not a User ? <Link className='text-blue-600 hover:text-blue-800' to="/register">Register</Link></p>
      </form>
    </div>
    </>
  )
}

export default Login
