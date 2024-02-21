import React, { useEffect } from 'react';
import { isAdmin } from '../../privileges.js';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { Component } = props;
  const isAuthenticated = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [validUser, setValidUser] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated) {
     setValidUser(true);
    } else {
      navigate('/login');
    }
  }, []);

return <>{validUser ? <Component /> : ' '}</>;
};

export default ProtectedRoute;
