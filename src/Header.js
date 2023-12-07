import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ showForm, setShowForm, isLoggedIn }) {
  const navigate = useNavigate();
  const appTitle = "Girlie's beauty community💅";

  const handleLogoClick = () => {
    // If the user is logged in, navigate to the profile page
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      // If not logged in, navigate to the login page
      navigate('/login');
    }
  };
  
  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
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
