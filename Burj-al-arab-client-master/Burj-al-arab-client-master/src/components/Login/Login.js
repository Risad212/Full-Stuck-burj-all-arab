import React, { useContext } from 'react';
import { initializeApp} from "firebase/app";
import { firebaseConfig } from '../firebase/FirebaseConfig';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {UserContext} from '../../App'
import {useLocation, useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);

const Login = () => {
    const [logInUser, setLogInUser] = useContext(UserContext)
    const navigate = useNavigate()

    const handleGoogleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
          signInWithPopup(auth, provider)
          .then((result) => {
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              const user = result.user;
              const {displayName, email} = user
              const signInUser = {name: displayName, email}
              setLogInUser(signInUser)
              Redirect()
              storgeAuthToken()
              
          }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.email;
              const credential = GoogleAuthProvider.credentialFromError(error);
          });
      }

    const storgeAuthToken = () =>{
        getAuth().currentUser.getIdToken(true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken)
          }).catch(function(error) {
            console.log(error)
        });
      }

      function Redirect(){
       navigate('/book')
      }
    return (
        <>
          <h2>This is login</h2> 
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </>
    );
};

export default Login;