import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
// import { useHistory } from 'react-router-dom';
import "./Login.css";
import {getToken} from "firebase/messaging";
import {messaging} from "../../firebase";

import {login} from "../../actions/auth";
import {SnackbarProvider, enqueueSnackbar} from "notistack";
import {Link, useNavigate} from "react-router-dom";

const initialState = {username: "", password: ""};

const Login = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const [deviceToken, setDeviceToken] = useState("");

  const requestNotifications = async () => {
    let permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BDK9twJ7eMd5Yo9JLBLPYgdVExaN0MdOE3qi7iID0Yyc-qfIouKz5JBw8TICChkJ5ScDKnQPhH-qnL6_aUsREkE"
        // To get This key Go to (firebase) → project settings → Cloud messaging → on the bottom you get →Web Push certificates → coppy the key pair
      });
      setDeviceToken(token);
      console.log("deviceToken ==> ", token);
    } else if (permission === "denied") {
      alert("you can not be able to get notifications.");
    }
  };
  useEffect(() => {
    requestNotifications();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("deviceToken ==> ", deviceToken);
    const updatedUser = {...formData, deviceToken: deviceToken};
    const error = await dispatch(login(updatedUser));

    if (error === "Invalid credentials") {
      enqueueSnackbar("Invalid credentials", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
    }
    if (error === undefined) {
      navigate("/");
      enqueueSnackbar("Logged In Successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
    }
    if (error === "User doesn't exist") {
      enqueueSnackbar("Please Enter Your Correct Credentials", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
      console.log(error);
    }
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // useEffect(() => {
  //   if (localStorage.getItem('LoginError')) {
  //     // history.push('/');
  //     enqueueSnackbar('Please Enter Your Correct Credentials', {
  //       variant: 'error',
  //       anchorOrigin: {
  //         vertical: 'top',
  //         horizontal: 'center',
  //       },
  //     });
  //     localStorage.removeItem('LoginError');
  //   }
  // }, [error]);

  return (
    <form
      className='login-form'
      onSubmit={handleSubmit}>
      <SnackbarProvider />
      <div className='login-box'>
        <div className='dim-bg'></div>
        <h2>Social LMS</h2>
        <input
          className='input-field'
          type='text'
          name='username'
          id='username'
          placeholder='Username'
          onChange={handleChange}
        />
        <input
          className='input-field'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <div className='forgot-container'>
          <span
            onClick={() => {
              navigate("/forgot-password");
            }}
            className='forgot-container-span'>
            Forgot Password?
          </span>
          <button
            className='submit-btn'
            type='submit'>
            Log In
          </button>
        </div>
        <div>
          <span>
            Don't have an account?{" "}
            <Link to='/SignUp'>
              <span className='login'>Sign up</span>
            </Link>{" "}
            here!
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
