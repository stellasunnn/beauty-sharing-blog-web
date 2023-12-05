import React from "react";
import { Link } from "react-router-dom";

function Header({ showForm, setShowForm }) {
  const appTitle = "Share and Rate!";
  return (
    <header className="header">
      <div className="logo">
        {/* Use Link to navigate to the profile page */}
        <Link to="/profile">
          <img
            src="logo.png"
            height="68"
            width="68"
            alt="Today I Learned Logo"
          />
        </Link>
        <h1>{appTitle}</h1>
      </div>

      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wordcloud">WordCloud</Link>
          </li>
          {/* Add other navigation items as needed */}
        </ul>
      </nav>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share your favorite!"}
      </button>
    </header>
  );
}

export default Header;
