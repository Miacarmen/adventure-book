import React from "react";
import { Button } from "react-daisyui";

const About = () => {
  return (
    <div className="container text-base-200 text-center py-12 ">
      <div className="card rounded-full bg-neutral text-lg mx-8 py-5 pb-5 mb-24" >
      
        <h2 className="py-6 text-2xl font-extrabold">Welcome to Adventure Book!</h2>
        <p>
          Your one-stop-shop for your travel experiences - from planning to
         sharing with the world.
        </p>
        <br></br>
        <p>
          Get personalized recommendations for locations, activities, restaurants,
          etc, to help you plan your next big adventure.
        </p>
        <p>
          No more relying on TripAdvisor and getting stuck visiting the most
          tourist ridden places and hard to book excursions.
        </p>
        <br></br>
        <p>
          Easily plan vacations with unique recommendations from real like-minded
          people who don't want to do what everyone else is doing.
        </p>
        <br></br>
        <p className="font-bold text-xl">Get off the beaten path.</p>
        <p className="font-bold text-xl">Blend with the locals.</p>
        <p className="font-bold text-xl">Try new things.</p>
        <br></br>
        <p>
          Discover hidden gems you aren't going to find on any travel site or
          Google marketing ads.
        </p>
        <br></br>

        <h3 className="font-bold text-lg">Get out there and create new memories you'll remember forever!</h3>

        <div className="py-5">
          <Button className="btn rounded-full bg-secondary border-none hover:bg-secondary-focus hover:shadow-lg text-base-content">
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
