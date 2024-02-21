import React, {useState} from "react";
import "./Login.css";
import {SnackbarProvider, enqueueSnackbar} from "notistack";
import {useLocation} from "react-router-dom";
import {UpdateUserPassword} from "../../api";
import {CircularProgress} from "@mui/material";

const initialState = {password: ""};

const UpdatePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const location = useLocation();
  const [loading, setloading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const params = location?.state;
    setloading(true);
    const response = await UpdateUserPassword({email: params.email, password: formData.password, otp: params.otp});
    setloading(false);
    if (response && response.status == 200) {
      alert("Your Password has been updated successfully. Now you can log in with your new Password");
      window.location.href = "/";
    } else {
      enqueueSnackbar("Something Went wrong While Updating passowrd", {
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
        <h2>Add New Password</h2>
        <input
          className='input-field'
          type='password'
          name='password'
          id='password'
          placeholder='Enter your new Password'
          onChange={handleChange}
        />
        <div className='forgot-container'>
          <button
            className='submit-btn margin-top'
            type='submit'>
            {loading ? <CircularProgress size={20} /> : "Submit"}
          </button>
        </div>
        <div></div>
      </div>
    </form>
  );
};

export default UpdatePassword;
