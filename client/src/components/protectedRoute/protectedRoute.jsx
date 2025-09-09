import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children,allowedRoles  }) {
   const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log(user);
  if (!user) {
    console.log(user);
    
    // if not logged in → redirect to login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  if (allowedRoles && allowedRoles  !== user.role) {
    console.log("not allowed");
    // if logged in but role not allowed → redirect to unauthorized or homepage
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}