import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import ProtectedRouteAdmin from "./components/Protected/ProtectedRouteAdmin";
import Login from "./components/Login/Login.js";
import Signup from "./components/Login/Signup.js";
import UpdatePassword from "./components/Login/change-password";
import Home from "./components/Home/Home.js";
import Users from "./components/Users/Users.js";
import Societies from "./components/Societies/Societies.js";
import Society from "./components/Society/Society.js";
import ChangePassword from "./components/ChangePassword/ChangePassword.js";
import FloatingWhatsApp from "react-floating-whatsapp";
import {messaging, onMessageListener} from "./firebase";
import "./index.css";
import PostSingle from "./components/SinglePost/PostSingle.js";
import ForgotPassword from "./components/Login/forgot-password";
import VerifyOTP from "./components/Login/verify-otp";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const statusMessage = "Hello and welcome to the GCU Society Hub Students Care! We're excited to have you here and look forward to assisting you with any questions or concerns you may have.";
  const [notification, setNotification] = useState({title: "", body: ""});
  const notify = () => toast(<ToastDisplay />);

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }
  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);
  onMessageListener()
    .then(payload => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body
      });
    })
    .catch(err => console.log("failed: ", err));

  return (
    <div className='app'>
      <div></div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            exact
            element={<Login />}
          />
          <Route
            path='/signup'
            exact
            element={<Signup />}
          />
          <Route
            path='/forgot-password'
            exact
            element={<ForgotPassword />}
          />
          <Route
            path='/verify-otp'
            exact
            element={<VerifyOTP />}
          />
          <Route
            path='/add-new-password'
            exact
            element={<UpdatePassword />}
          />

          <Route
            path='/'
            exact
            element={<ProtectedRoute Component={Home} />}
          />
          {/* <Route path="/" exact element={<Home />} /> */}
          <Route
            path='/posts/:id'
            exact
            element={<ProtectedRoute Component={PostSingle} />}
          />

          <Route
            path='/users'
            exact
            element={<ProtectedRouteAdmin Component={Users} />}
          />
          <Route
            path='/societies'
            exact
            element={<ProtectedRouteAdmin Component={Societies} />}
          />
          <Route
            path='/societies/:id'
            exact
            element={<ProtectedRouteAdmin Component={Society} />}
          />
          {/* <Route path="/societies/:id" exact element={<Society />} /> */}

          <Route
            path='/change password'
            exact
            element={<ChangePassword />}
          />

          {/* <Route path="/societies" exact element={<Societies />} /> */}
          {/* <ProtectedRoute path="/" exact component={Home} /> */}
          {/* <ProtectedRoute path="/users" exact component={Users} /> */}
          {/* <ProtectedRoute path="/societies" exact component={Societies} /> */}
          {/* <ProtectedRoute path="/societies/:id" exact component={Society} /> */}
          {/* <ProtectedRoute path="/change password" exact component={ChangePassword} /> */}
          <Route
            path='*'
            component={() => "404 PAGE NOT FOUND"}
          />
        </Routes>
{/*        <FloatingWhatsApp
          chatMessage={statusMessage}
          statusMessage={"Abu Hura"}
          avatar={require("./img/logo.png")}
          phoneNumber={"+923086173323"}
          accountName={"Abu Huraira"}
          height={false}
          allowClickAway={true}
          allowEsc={true}
          styles={{bottom: "50px", left: "50px"}}
        />*/}
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
