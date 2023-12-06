import { useEffect, useState } from 'react';
import { supabase, authenticateUser, signOutUser } from './supabase';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const LoginComponent = ({ onLogin }) => {
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
    try {
      // Check password length
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }

      // Call the authenticateUser function
      await authenticateUser(email, password, false); // Set isRegister to false

      // Check if the user is authenticated
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Notify the parent component that the user is logged in
        onLogin();

        // Navigate to the main page after successful login
        navigate('/');
      } else {
        console.error('Authentication error: User not found');
        // Handle the authentication error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      // Handle the authentication error (e.g., show an error message)
    }
  };

    const navigateToRegister = () => {
    // Redirect to the register page when the "Register" button is clicked
    navigate('/register');
    };

  return (
    <div>
      <h2>Login</h2>
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
        Login
      </button>
      <button onClick={navigateToRegister}>
        Register
      </button>
    </div>
  );
};

export default LoginComponent;