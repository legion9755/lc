// src/components/Login.js
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebase.init';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      console.log('User logged in: ', user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    console.log('User logged out');
  };
  const handleNavigate = () => { 
    navigate('/');// Navigate to the visualization page
};

  return (
    <div>
      {!user ? (
        <div>
          <h2>Login</h2>
          <button onClick={handleLogin}>Sign in with Google</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <button onClick={handleLogout}>Log out</button>
          <button onClick={handleNavigate}>Go to Home page</button>
        </div>
      )}
    </div>
  );
};

export default Login;

