import React from "react";
import '../styles/Contact.css'

import Logo from "../images/logo.png";

const Contact = () => {
  return (
    <div className="bg-base-100 flex flex-col pt-7 pb-36 justify-center items-center text-secondary-content mainComp">
      <div className="card grid grid-cols-2 px-24 pb-8 rounded-full bg-base-200 contactForm">
        <div className=" px-16 text-center">
          <h1 className="text-xl font-bold pt-14 pb-4">
            Let's Talk About Everything!
          </h1>
          <p>
            Hate forms? Send us an{" "}
            <span className="underline">
              <a href="https://mail.google.com/mail/u/2/?ogbl#inbox?compose=CllgCJlDTWfQTJNfsdzbFRQKFPjwqJRbmPXMlNqCQBBwFzJkMtdJBZgMWxMdJHxPMXJLhGCnmRL">
                email
              </a>
            </span>
            {" "}
            instead.
          </p>
          <figure className="py-9">
          <img src={Logo} alt="logo" width="400px" height="400px"/>
          </figure>
        </div>
        <form className="bg-base-200 py-8 px-16 contactDiv">
          <h2 className="text-center text-xl font-bold py-4">Get in Touch</h2>
          <div>
            <span className="uppercase text-sm text-neutral-content font-bold">
              Full Name
            </span>
            <input
              className="w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="mt-2">
            <span className="uppercase text-sm text-gray-600 font-bold">
              Email
            </span>
            <input
              className="w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mt-2">
            <span className="uppercase text-sm text-gray-600 font-bold">
              Subject
            </span>
            <input
              className="w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Subject"
            />
          </div>
          <div className="mt-2">
            <span className="uppercase text-sm text-gray-600 font-bold">
              Message
            </span>
            <textarea className="w-full h-32 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mt-3">
            <button className="btn text-sm font-bold bg-neutral text-base-100 p-3 rounded-full w-full contactBtn">
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
