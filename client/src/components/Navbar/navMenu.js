import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { AiOutlineBars } from 'react-icons/ai';
import Auth from "../../utils/auth";

const Menu = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  const [expandMenu, setExpandMenu] = useState(false);

  return (
    <div className="dropdown dropdown-left mobile-nav">
      <label
        tabIndex="0"
        type="checkbox"
        className="dropMenu btn btn-ghost btn-circle"
        onClick={() => setExpandMenu(expandMenu)}
      >
        {/* toggle menu state on click */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </label>
      {Auth.loggedIn() ? (
        <ul
          tabIndex="0"
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
        >
          <Link to="/" className="hover:text-indigo-500 ">
            Home
          </Link>
          <Link to="/explore" className="hover:text-indigo-500">
            Explore
          </Link>
          <Link to="/dashboard" className="hover:text-indigo-500">
            Dashboard
          </Link>
          <Link to="/logout" className="hover:text-indigo-500" onClick={logout}>
            Logout
          </Link>
        </ul>
      ) : (
        <ul
          tabIndex="0"
          className=" menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>Home</li>
          <li>Login</li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
