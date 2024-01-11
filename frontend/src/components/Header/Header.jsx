import React, { useEffect, useState } from "react";

import { FaVideo } from 'react-icons/fa'

import '../../static/css/style.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../../features/auth/authSlice";
import axios from 'axios'
import getAuthHeaders from "../../utils/authHeader"

function Header() {
    const user = useSelector(state => state.user)
    const tokens = useSelector(state => state.tokens)
    const isAuthenticated = useSelector(state => state.isAuthenticated)

    const dispatch = useDispatch()

    const logoutUser = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/users/logout', {})

            const data = await response.data;
            console.log(data)
        } catch (error) {
            console.log(error.response)
        } finally {
            dispatch(logout())
        }
    }

    const setLoginUser = (tokens, user) => {
        dispatch(login({tokens: tokens, user: user}));
    }


    useEffect(() => {
        // if (localStorage.getItem('accessToken')) {
        //     const tokens = {
        //         accessToken: JSON.parse(localStorage.getItem('accessToken')),
        //         refreshToken: JSON.parse(localStorage.getItem('refreshToken'))
        //     },
        //     const user = JSON.parse(localStorage.getItem('user'),
            
        //     setLoginUser(tokens, user),
        // }

        if (isAuthenticated) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokens?.accessToken}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [])

    return (
        <div className="navbar navbar-expand-sm bg-white fixed-top">
            <div className="container-fluid mx-5">
                <div className="left-nav-bar">
                    <span className="nav-logo">Logo</span>
                </div>
                <div className="middle-nav-bar">
                    <input className="search-box" />
                    <button className="search-btn">
                    </button>
                </div>
                <div className="right-nav-bar">
                    <div className="video-icon">
                        <FaVideo size={25} color="red" />
                    </div>
                    {isAuthenticated ? (
                        <div className="user-icon">
                            <img className="profile-img" src={user?.avatar}/>
                            <button
                                className="btn btn-primary btn-sm mx-2"
                                onClick={logoutUser}
                            >Logout</button>
                        </div>
                    ) : (
                        <div className="user-icon">
                            <Link to="/login" className="nav-btn">Sing in</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;