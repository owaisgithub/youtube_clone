import { useState } from "react";
import axios from "axios";


const Register = () => {

    const [userData, setUserData] = useState({
        fullname: "",
        username: "",
        email: "",
        avatar: "",
        password: "",
    })

    const register = async (e) => {
        e.preventDefault();
        console.log(userData)
        const formData = new FormData()
        formData.append('fullname', userData.fullname)
        formData.append('username', userData.username)
        formData.append('email', userData.email)
        formData.append('avatar', userData.avatar)
        formData.append('password', userData.password)
        console.log("Form Data: " + formData)

        const response = await axios.post('http://localhost:8000/api/v1/users/create-user', formData)
        const data = await response.data
        console.log(data)
    }

    const inputChange = (e) => {
        const {name, value} = e.target
        setUserData({
         ...userData,
            [name]: value
        })
    }

    return (
        <form className="form-container" onSubmit={register}>
            <div className="mb-3 mt-3">
                <label for="email" className="form-label">Fullname:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Fullname"
                    name="fullname"
                    onChange={inputChange}
                />
            </div>
            <div className="mb-3">
                <label for="pwd" className="form-label">Username:</label>
                <input
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Username" 
                    name="username"
                    onChange={inputChange}  
                />
            </div>
            <div className="mb-3">
                <label for="pwd" className="form-label">Email:</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter Email" 
                    name="email" 
                    onChange={inputChange}
                />
            </div>
            <div className="mb-3">
                <label for="pwd" className="form-label">Avatar:</label>
                <input 
                    type="file" 
                    className="form-control" 
                    placeholder="Enter Password" 
                    name="avatar"
                    onChange={(e) => {
                        setUserData({
                         ...userData,
                            avatar: e.target.files[0]
                        })
                    }}
                />
            </div>
            <div className="mb-3">
                <label for="pwd" className="form-label">Password:</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password" 
                    name="password" 
                    onChange={inputChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    )
}

export default Register