/* eslint-disable no-unreachable */
import React, { useEffect } from 'react';
import { isAdmin } from '../../privileges.js';
import { useNavigate } from 'react-router-dom';

const ProtectedRouteAdmin = (props) => {
  const { Component } = props;
  const isAuthenticated = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [validAdmin, setValidAdmin] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin()) {
        setValidAdmin(true);
      } else {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return <>{validAdmin ? <Component /> : ''}</>;
};

export default ProtectedRouteAdmin;
