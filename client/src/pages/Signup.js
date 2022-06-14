import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import "font-awesome/css/font-awesome.min.css";
import "../styles/Login.css";
import "../styles/Balloons.css";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const [isActive, setIsActive] = useState("active");
  // update state based on form input change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formState }
      });

      Auth.login(data.createUser.token);
      setTimeout(() => {
        window.location.assign('/explore');
      }, 3000);
    } catch (e) {
      console.error(e);
    }
    setIsActive((current) => !current);
  };

  //to get balloons to render on page
  function displayBalloons() {
    function random(num) {
      return Math.floor(Math.random() * num);
    }

    function getRandomStyles() {
      var r = random(255);
      var g = random(255);
      var b = random(255);
      var mt = random(200);
      var ml = random(50);
      var dur = random(5) + 5;
      return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7); 
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
    `;
    }

    function createBalloons(num) {
      var balloonContainer = document.getElementById("balloon-container");
      for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.append(balloon);
      }
    }

    createBalloons(100);
  }
  return (
    <div id="balloon-container">
      <div className="signupForm">
        <div
          id="signupTxt"
          className={isActive ? "active" : "hidden"}
        >
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body p-16 cardBody">
            <h1 className="card-title justify-center text-secondary-content">
              PLEASE SIGN UP
            </h1>
            {data ? (
              <p className="text-secondary-content">
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="input-icons">
                  <i className="fa-solid fa-user text-secondary-content icon"></i>
                  <input
                    name="username"
                    placeholder="Username"
                    value={formState.username}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs input-field text-secondary-content p-4"
                  />
                  <i className="fa-solid fa-envelope text-secondary-content icon"></i>
                  <input
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs input-field text-secondary-content p-4"
                  />
                  <i className="fa-solid fa-lock text-secondary-content icon"></i>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs input-field text-secondary-content p-4"
                  />
                </div>
                <div className="card-actions justify-center">
                  <button
                    className="btn btn-primary bg-accent text-base-content hover:bg-accent-focus hover:shadow-lg rounded-full border-none"
                    type="submit"
                    onClick={displayBalloons}
                  >
                    Signup
                  </button>
                </div>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
