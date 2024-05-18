import React, { useContext, useState } from 'react'
import './Login_Signup.css'
import { assets } from '../../assets/assets';
const Login_Signup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login");
    return (
        <>
            <div className="login">
                <form action="" className='login-container'>
                    <div className="login-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <div className="login-input">
                        {currState === "Login" ? <></> : <input type='text' placeholder='Your Name : ' required />}
                        <input type="email" placeholder='enter your email' required />
                        <input type="password" placeholder='enter your password' required />
                    </div>
                    <button type='submit'> {currState === "Sign Up" ? "create an account " : "Login"}</button>

                    {currState === "Login" ? <p>create an account <span onClick={() => setCurrState("Sign Up")}> Click here </span></p>
                        : <p>already have an account  ? <span onClick={() => setCurrState("Login")}>Login in here </span></p>
                    }
                </form>
            </div>
        </>
    )
}

export default Login_Signup
