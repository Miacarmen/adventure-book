import React from "react-daisyui";
import { Link } from "react-router-dom";
import { Footer } from "react-daisyui";
// social icons
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { BsStars } from "react-icons/bs";

import Auth from "../../utils/auth";

const Foot = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.assign('/')
  };
  return (
    <Footer className="footer footer-center p-4 bg-primary rounded text-secondary-content">
      <div>
        <div className="font-semibold text-lg">
          <Footer.Title>Company</Footer.Title>
        </div>
        <div className="sm:flex items-stretch space-x-4 mb-4 mt-3">
          {Auth.loggedIn() ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/explore">Explore</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/logout" onClick={logout}>
                logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>

        <div className="font-semibold text-lg">
          <Footer.Title>Social</Footer.Title>
        </div>
        <div className="socialIcons flex pb-3">
          <a href="https://www.facebook.com/">
            <BsFacebook size={30} className="mr-3" />
          </a>

          <a href="https://instagram.com">
            <AiFillInstagram size={35} className="mr-3" />
          </a>

          <a href="https://twitter.com">
            <BsTwitter size={30} className="mr-3" />
          </a>
        </div>
        <div className="flex">
          <p className="pr-2">Copyright © 2022 - Made With Wanderlust </p>
          <BsStars className="text-secondary" size={25} />
        </div>
      </div>
    </Footer>
  );
};

export default Foot;
