import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import GetUserHook from '../hooks/GetUserHook';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
      // Show toast message outside of the rendering logic
      // (preferably in a useEffect hook or another component lifecycle method)
      // For now, let's simply log an error message
      console.log("User not found in ProtectedRoute component");
      // Return a Redirect component to navigate to the signup route
      return <Navigate to="/" replace />;
  }

  return children;
  
};

export default ProtectedRoute;