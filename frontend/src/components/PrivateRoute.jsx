import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // Check if access token exists in localStorage
    const isAuthenticated = !!localStorage.getItem('access_token');

    // If not authenticated, redirect to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
