import React, { useState, useEffect } from "react";
import Header from "./Header";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";
import FactList from "./FactList";
import Loader from "./Loader";
import supabase from "./supabase";
import "./style.css";
import WordCloud from "./WordCloud";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
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

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
      <WordCloud />
    </>
  );
}

export default App;
