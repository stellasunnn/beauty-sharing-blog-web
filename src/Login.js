import { useEffect, useState } from 'react';
import { supabase, authenticateUser, createUser, signOutUser } from './supabase';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const LoginComponent = ({ onLogin, isRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  // Add an event listener to handle automatic logout
  const handleBeforeUnload = () => {
    // Sign out the user before unloading the page
    signOutUser();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Clean up the event listener when the component unmounts
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
  }, []);
  
  const handleAuthentication = async () => {
    // You can add additional validation logic here
    await createUser(email, password);

    // Call the authenticateUser function
    await authenticateUser(email, password, isRegister);

    // Notify the parent component that the user is logged in
    onLogin();

    // Navigate to the main page after successful login
    navigate('/');
  };

  return (
    <div>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuthentication}>
        {isRegister ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default LoginComponent;
