import React from "react";
import { Hero } from "react-daisyui";

const Explore = () => {
  return (
    <Hero>
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        ></input>
        <button type="submit" class="absolute right-0 top-0 mt-5 mr-4"></button>
      </div>
    </Hero>
  );
};

export default Explore;
