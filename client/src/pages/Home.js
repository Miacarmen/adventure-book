import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "react-daisyui";
import "../App.css";
import "../styles/Homepage.css";
import Stamps from "../images/stamps.png";

import Auth from "../utils/auth";

const Home = () => {
  return (
    <div className="container mb-32">
      <Hero className="min-h-screen bg-base-100 align-top">
        <Hero.Content className="text-center">
          <div className="max-w-lg text-secondary-content">
            <h1 className="appName text-7xl pb-8">ADVENTURE BOOK</h1>
            <div className="bookContainer py-40">
              <div className="book">
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn">
                  <img src={Stamps} alt="passport stamps" id="stamps" />
                </span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="cover"></span>
                <span className="page"></span>
                <span className="cover turn"></span>
              </div>
            </div>
            <h2 className="text-4xl">
              <p className="pt-5 pb-2">Get Inspired</p>
              <p>Plan Your Next Adventure</p>
            </h2>
            {Auth.loggedIn() ? (
              <Link
                to="/explore"
                className="btn hover:bg-accent-focus hover:shadow-lg rounded-full border-none mt-8 bg-accent text-base-content"
              >
                EXPLORE
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn hover:bg-accent-focus hover:shadow-lg rounded-full border-none mt-8 bg-accent text-base-content"
              >
                EXPLORE
              </Link>
            )}
          </div>
        </Hero.Content>
      </Hero>

      <div className="bg-primary card md:rounded-full pt-4 pb-6 ">
        <div className="text-center text-neutral-content  ">
          <div>
            <h2 className="py-9 text-lg font-light m-auto md:font-semibold md:text-2xl">
              Get Recommendations From Real People <br></br>
              Who Have Experienced The Places You Want to Go, And The Activities
              You Want To Do. <br></br>
              <p className=" text-indigo-500">
                Discover Hidden Gems, Live Like The Locals Do.
              </p>
              Google and Travel Advisor Don't Always Know It All.
            </h2>
            {Auth.loggedIn() ? (
              <Link
                to="/explore"
                className="btn hover:bg-accent-focus hover:shadow-lg rounded-full border-none mt-2 bg-accent text-base-content"
              >
                GET STARTED
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn hover:bg-accent-focus hover:shadow-lg rounded-full border-none mt-8 bg-accent text-base-content"
              >
                GET STARTED
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
