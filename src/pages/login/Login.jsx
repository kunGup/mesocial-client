import "./login.css"
import React, { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext"
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

export default function Login() {
  const {user,isFetching,error,dispatch} = useContext(AuthContext)
  const email=useRef()
  const password=useRef()
  const handleSubmit = (e)=>{
    e.preventDefault()
    loginCall({ email: email.current.value, password: password.current.value}, dispatch);
  }
  console.log(user);
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">MeSocial</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on MeSocial.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                className="loginInput"
                ref={email}
              />
              <input
                type="password"
                placeholder="Password"
                minLength="6"
                required
                className="loginInput"
                ref={password}
              />
              <button className="loginButton" disabled={isFetching}>
                {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
              </button>
              <Link to={`/register`}>
                <button className="loginRegisterButton">
                  {isFetching ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Create a New Account"
                  )}
                </button>
              </Link>
              <span className="loginForgot">Forgot Password?</span>
            </form>
          </div>
        </div>
      </div>
    );
}
