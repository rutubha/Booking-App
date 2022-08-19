import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './login.css'

const Login = () => {
    const [ creadentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", creadentials);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
            navigate("/");
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE", payload: error.response.data})
        }
    }

  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
            <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
            <button disabled={loading} onClick={handleClick} className='lButton'>Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login
