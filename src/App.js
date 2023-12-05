import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Header";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";
import FactList from "./FactList";
import Loader from "./Loader";
import LoginComponent from "./Login"; 
import Profile from './Profile';
import { supabase, authenticateUser, createUser } from './supabase';
import "./style.css";

import WordCloud from "./WordCloud";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  

  React.useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      let query = supabase.from("facts").select("*");
      if (currentCategory !== "all")
        query = query.eq("category", currentCategory);
      const { data: facts, error } = await query
        .order("votesInteresting", { ascending: false })
        .limit(1000);
      if (!error) setFacts(facts);
      else alert("There was a problem getting data");
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);

    const handleLogin = () => {
    setLoggedIn(true);
    };

  return (
    <Router>
      <div>
        <Header showForm={showForm} setShowForm={setShowForm} />
        {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}

        
        <Routes>
          <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
          <Route path="/" element={isLoggedIn ? <AppContent {...{ showForm, setShowForm, facts, setFacts, isLoading, currentCategory, setCurrentCategory }} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

// AppContent is a separate component to avoid rendering logic clutter in App.js
const AppContent = ({
  showForm,
  setShowForm,
  facts,
  setFacts,
  isLoading,
  currentCategory,
  setCurrentCategory,
}) => {
  return (
    <main className="main">
      <CategoryFilter setCurrentCategory={setCurrentCategory} />
      {isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} />}
      <div className="wordcloud-container">
        <WordCloud />
      </div>
    </main>
  );
};

export default App;
