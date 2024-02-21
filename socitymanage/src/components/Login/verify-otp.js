import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
// import { useHistory } from 'react-router-dom';
import "./Login.css";
import {CircularProgress} from "@mui/material";
import OtpInput from "react-otp-input";

import {login} from "../../actions/auth";
import {SnackbarProvider, enqueueSnackbar} from "notistack";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {requestForgotPassword, verifyOTP} from "../../api";

const initialState = {email: ""};

const VerifyOTP = () => {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async e => {
    const email = location?.state?.formData?.email;
    e.preventDefault();
    console.log("OTP is ", otp, email);

    setloading(true);
    const response = await verifyOTP({email: email, otp: otp});
    setloading(false);
    if (response && response.status === 200) {
      console.log(response);
      enqueueSnackbar("OTP verified Successfully. Redirectig to Change Password screen.", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
      setTimeout(() => {
        navigate("/add-new-password", {state: {otp: otp, email: email}});
      }, 5000);
    } else {
      enqueueSnackbar("You have Entered Wrong OTP. Please Try again", {
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
        <div className='otp-verify-box'>
          <h2>Please Verify Your OTP</h2>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={props => <input {...props} />}
            inputStyle={{fontSize: 25, height: 50, width: 50}}
          />
        </div>
        <div className='forgot-container'>
          <button
            className='submit-btn margin-top'
            type='submit'>
            {loading ? <CircularProgress size={20} /> : "Verify"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerifyOTP;
