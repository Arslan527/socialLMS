import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
// import { useHistory } from 'react-router-dom';
import "./Login.css";
import {CircularProgress} from "@mui/material";

import {login} from "../../actions/auth";
import {SnackbarProvider, enqueueSnackbar} from "notistack";
import {Link, useNavigate} from "react-router-dom";
import {requestForgotPassword} from "../../api";

const initialState = {email: ""};

const ForgotPassword = () => {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setloading(true);
    const response = await requestForgotPassword(formData);
    setloading(false);
    if (response && response.status === 201) {
      console.log(response);
      enqueueSnackbar("OTP has been sent by email. please check your email. Redirecting To Verify OTP Page. Please Wait", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
      setTimeout(() => {
        navigate("/verify-otp", {state: {formData}});
      }, 3000);
    } else {
      enqueueSnackbar("User not Exisit with email that you have enetered ", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
    }
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <form
      className='login-form'
      onSubmit={handleSubmit}>
      <SnackbarProvider />
      <div className='login-box'>
        <div className='dim-bg'></div>
        <h2>Forgot Password</h2>
        <input
          className='input-field'
          type='text'
          name='email'
          id='email'
          placeholder='Enter Your Email'
          onChange={handleChange}
        />
        <div className='forgot-container'>
          <button
            className='submit-btn'
            type='submit'>
            {loading ? <CircularProgress size={20} /> : "Send OTP"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
