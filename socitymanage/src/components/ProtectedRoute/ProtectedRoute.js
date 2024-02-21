import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import {} from 'react-router-dom';
import { isAdmin } from '../../privileges.js';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = JSON.parse(localStorage.getItem('profile'));

  if (
    { ...restOfProps }.path === '/users' ||
    { ...restOfProps }.path === '/societies'
  ) {
    if (!isAdmin()) {
      return '404 NOT FOUND';
    }
  }

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
