import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useHistory } from 'react-router-dom';
import './Login.css';
import { createUser } from '../../actions/users.js';
import { useNavigate } from 'react-router-dom';

// import { login } from '../../actions/auth';

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  cnic: '',
  phoneNumber: '',
  designation: '',
  department: '',
};

const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required('Please Enter Your Name'),
  username: Yup.string().min(2).max(25).required('Enter Yo urUsername'),
  email: Yup.string().email().required('Enter Your Email'),
  password: Yup.string().min(6).max(25).required('Please Enter Your Password'),
  cnic: Yup.string().min(13).max(13).required('Enter Your CNIC'),
  phoneNumber: Yup.string().min(11).max(11).required('Enter Your Phone'),
  designation: Yup.string()
    .min(2)
    .max(25)
    .required('Select Your Designation'),
  department: Yup.string()
    .min(2)
    .max(25)
    .required('Select Your Department'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialState,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(values);

        dispatch(createUser(values));
        action.resetForm();
        navigate('/login');
      },
    });

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-box">
        <div className="dim-bg"></div>
        <h2>Social LMS</h2>
        <input
          className="input-field"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <p
            className="error"
            style={{
              color: 'red',
              fontSize: '15px',
              textAlign: 'left',
              marginLeft: '20px',
              marginTop: '-10px',
              marginBottom: '0px',
            }}
          >
            {errors.name}
          </p>
        )}
        <div className="userfield">
          <div>
            <input
              className="input-field"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <p
                className="error"
                style={{
                  color: 'red',
                  fontSize: '15px',
                  textAlign: 'left',
                  marginLeft: '10px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
              >
                {errors.username}
              </p>
            )}
          </div>
          <div>
            <input
              className="input-field"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p
                className="error"
                style={{
                  color: 'red',
                  fontSize: '15px',
                  textAlign: 'left',
                  marginLeft: '10px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <input
          className="input-field"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <p
            className="error"
            style={{
              color: 'red',
              fontSize: '15px',
              textAlign: 'left',
              marginLeft: '20px',
              marginTop: '-10px',
              marginBottom: '0px',
            }}
          >
            {errors.password}
          </p>
        )}
        <div className="userfield">
          <div>
            <input
              className="input-field"
              type="text"
              name="cnic"
              id="cnic"
              placeholder="CNIC No."
              value={values.cnic}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cnic && touched.cnic && (
              <p
                className="error"
                style={{
                  color: 'red',
                  fontSize: '15px',
                  textAlign: 'left',
                  marginLeft: '10px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
              >
                {errors.cnic}
              </p>
            )}
          </div>
          <div>
            <input
              className="input-field"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <p
                className="error"
                style={{
                  color: 'red',
                  fontSize: '15px',
                  textAlign: 'left',
                  marginLeft: '10px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
              >
                {errors.phoneNumber}
              </p>
            )}
          </div>
        </div>
        <div className="userfield">
          <div>
            <select
              className="input-field"
              name="designation"
              id="designation"
              value={values.designation}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Designation</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
            {errors.designation && touched.designation && (
              <p
                className="error"
                style={{
                  color: 'red',
                  fontSize: '15px',
                  textAlign: 'left',
                  marginLeft: '10px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
              >
                {errors.designation}
              </p>
            )}
          </div>
          <div>
            <select
              className="input-field"
              name="department"
              id="department"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Department</option>
              <option value="se">Software Engineering</option>
              <option value="it">
                Information Technology
              </option>
              <option value="cs">Computer Science</option>
              <option value="ds">Data Science</option>
            </select>
            {errors.department && touched.department && (
              <p
                className="error"
                style={{
                  color: 'red',
                  fontSize: '15px',
                  textAlign: 'left',
                  marginLeft: '10px',
                  marginTop: '0px',
                  marginBottom: '0px',
                }}
              >
                {errors.department}
              </p>
            )}
          </div>
        </div>
        <button className="submit-btn" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Signup;
