// RegisterComponent.js
import React, { useState } from 'react';
import { createUser } from './supabase'; // Import the createUser function

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      // Check password length
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }

      // Call the createUser function to register the user
      await createUser(email, password);

      // Notify the user that registration was successful or handle it as needed
      alert('Registration successful. Please check your email for confirmation.');
      
      // You may also want to redirect the user to the login page or any other desired page
    } catch (error) {
      console.error('Registration error:', error.message);
      // Handle the registration error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegistration}>
        Register
      </button>
    </div>
  );
};

export default RegisterComponent;

