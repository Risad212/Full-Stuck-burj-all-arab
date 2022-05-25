import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivetRoute = ({children}) => {
  const [logInUser, setLogInUser] = useContext(UserContext)
  return logInUser? children: <Navigate to="/login" />
};

export default PrivetRoute;