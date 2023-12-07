// Profile.js

import React, { useEffect, useState } from "react";
import { supabase } from './supabase';
import Fact from './Fact';  // Import your Fact component
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userFacts, setUserFacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch facts associated with the authenticated user
    async function fetchUserFacts() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userFacts, error } = await supabase
          .from('facts')
          .select('*')
          .eq('user_id', user.id);
          
        if (!error) {
          setUserFacts(userFacts);
        } else {
          console.error('Error fetching user facts:', error);
        }
      } else {
        // If user is not authenticated, redirect to the login page
        navigate('/login');
      }
    }

    fetchUserFacts();
  }, [navigate]);

  return (
    <div>
      <h2>Your Posts</h2>
      <ul>
        {userFacts.map(fact => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
    </div>
  );
}

export default Profile;