import React, { useState } from "react";
import { CATEGORIES, isValidHttpUrl } from "./util";
import { supabase, authenticateUser, createUser } from './supabase';
import { Fact } from "./Fact";

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  // Fixed in a video text overlay
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  // Check if user is authenticated before accessing session
  // const { user } = supabase.auth.getUser();

  

  async function handleSubmit(e) {
  // 1. Prevent browser reload
    e.preventDefault();


  // Check if the user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  // Check if data is valid. If so, create a new fact
  if (text && isValidHttpUrl(source) && category && textLength <= 200) {

    // Check if the user is present
    // if (!user) {
    //   // Display a message or notification to inform the user to log in
    //   alert('Please log in before posting a fact.');
    //   return;
    // }

    // Check if the user's account is confirmed
    if (user.confirmed_at === null) {
      // Display a message or notification to remind the user to confirm their account
      alert('Please confirm your account before posting a fact.');
      return;
    }
      // 3. Upload fact to Supabase and receive the new fact object
      setIsUploading(true);


    try {
      // Upload fact to Supabase and receive the new fact object
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category, user_id: user.id }])
        .select();
        setIsUploading(false);
      if (error) {
        console.error('Error inserting new fact:', error);
      } else {
        console.log('New fact added:', newFact);
        // Add the new fact to the UI: add the fact to state
        setFacts((facts) => [newFact[0], ...facts]);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }

      // 5. Reset input fields
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

export default NewFactForm;
