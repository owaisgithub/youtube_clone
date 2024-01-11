import { FaUser } from 'react-icons/fa'
import { FaLock } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: e.target.elements.username.value,
                    password: e.target.elements.password.value
                })
            })
            const data = await response.json()
            console.log(data)
            dispatch(login({user: data.data.user, tokens:data.data.tokens}))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="form-container" onSubmit={loginUser}>
            <div className="d-flex mb-3 mt-3">
                <FaUser size={25} color='#1872f1' />
                <input type="text" className="form-input mx-2" placeholder="Enter Your Username" name="username" />
            </div>
            <div className="d-flex mb-3">
                <FaLock size={25} color='#1872f1' />
                <input type="password" className="form-input mx-2" placeholder="Enter Ypur Password" name="password" />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <div>
                <span>Not account?</span>
                <Link to="/register">Register</Link>
            </div>
        </form>

    )
}

export default Login