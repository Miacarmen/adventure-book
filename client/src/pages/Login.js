import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutation";
import Auth from "../utils/auth";
import { Button } from "react-daisyui";
import "font-awesome/css/font-awesome.min.css";
import "../styles/Login.css";
import "../styles/Balloons.css";

const Login = () => {
  const [loginState, setLoginState] = useState({ username: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

//get rid of box when hit submit
  const [isActive, setIsActive] = useState("active");

  //update state when the input changes for login
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginState({
      ...loginState,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { ...loginState }
      });
      Auth.login(data.login.token);
      setTimeout(() => {
        window.location.assign('/explore');
      }, 3000);
    } catch(err) {
      console.error(err)
    }
    // clear form values
    setLoginState({
      username: "",
      password: ""
    });

    setIsActive((current) => !current);
  };

  //balloons render on page
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
      <div className="loginForm">
        <div
          id="signupTxt"
          className={isActive ? "active" : "hidden"}
        >
          <div className="card w-96 bg-base-200 shadow-xl">
            <div className=" card-body p-16 loginCard">
              <h1 className="card-title p-4 justify-center text-secondary-content">
                WELCOME BACK
              </h1>
                <form onSubmit={handleFormSubmit}>
                  <div className="input-icons">
                    <i className="fa-solid fa-user text-secondary-content icon"></i>
                    <input
                      name="username"
                      value={loginState.username}
                      placeholder="Username"
                      className="input input-bordered w-full max-w-xs input-field text-secondary-content"
                      onChange={handleChange}
                    />
                    <i className="fa-solid fa-lock text-secondary-content icon"></i>
                    <input
                      name="password"
                      value={loginState.password}
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-full max-w-xs input-field text-secondary-content"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="card-actions justify-center text-center">
                    <Button
                      className="btn btn-primary rounded-full bg-accent hover:bg-accent-focus hover:shadow-lg border-none text-base-content"
                      type="submit"
                      onClick={displayBalloons}
                    >
                      Login
                    </Button>
                  </div>
                </form>
              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
              <div>
                <h3 className="text-secondary-content text-lg">
                  Don't have an account?{" "}
                </h3>
                <Link to="/signup">
                  <h3 className="text-neutral text-lg">Sign Up!</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
