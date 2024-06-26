import React, { useContext, useState } from 'react'
import './Login_Signup.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
import { baseUrl } from '../../Urls';

const Login_Signup = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const { setToken } = useContext(StoreContext); // Add setToken here
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = `${baseUrl}`;
        if (currState === 'Login') {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.success) {
                toast.success(response.data.message)
                setToken(response.data.token); // Set the token here
                localStorage.setItem("token", response.data.token); // Store token in localStorage
                setShowLogin(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("User Not Register or wrong credendials")
        }
    }

    return (
        <div className="login">
            <form onSubmit={onLogin} className='login-container'>
                <div className="login-title">
                    <h2>{currState}</h2>
                    <img className='login-click' onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-input">
                    {currState === "Login" ? null : <input name="name" onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name : ' required />}
                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='enter your email' required />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='enter your password' required />
                </div>
                <button type='submit'> {currState === "Sign Up" ? "create an account " : "Login"}</button>
                {currState === "Login" ?
                    <p>create an account <span className='login-click' onClick={() => setCurrState("Sign Up")}> Click here </span></p> :
                    <p>already have an account  ? <span className='login-click' onClick={() => setCurrState("Login")}>Login in here </span></p>
                }
            </form>
        </div>
    )
}

export default Login_Signup;
