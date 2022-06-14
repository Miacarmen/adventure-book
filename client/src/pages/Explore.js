import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hero } from "react-daisyui";
// components
import ExploreCard from "../components/Card/ExploreCard";
import SearchForm from "../components/SearchForm/SearchForm";
// stylesheets
import "../App.css";
import "../styles/CardStyles.css";
import "../styles/exploreGrid.css";

import { useLazyQuery } from "@apollo/client";
import { QUERY_POSTS, QUERY_POSTS_WITH_TAG } from "../utils/queries";

const Explore = () => {
  const [queryData, setQueryData] = useState([]);

  const [getFilteredPosts] = useLazyQuery(QUERY_POSTS_WITH_TAG);
  const [getUnfilteredPosts] = useLazyQuery(QUERY_POSTS);

  function requestSearch(criteria) {
    getFilteredPosts({
      variables: { tags: criteria },
    }).then((res) => {
      if (res.data.postsByTag) {
        setQueryData(res.data.postsByTag);
      }
    });
  }

  // Start off with the results of an unfiltered query
  useEffect(() => {
    getUnfilteredPosts().then((res) => {
      if (res.data.posts) {
        setQueryData(res.data.posts);
      }
    });
  }, [getUnfilteredPosts]);

  return (
    <div className="pageContainer ">
      <Hero className="container pt-12 pb-4 bg-base-200 place-items-center">
        <div className="text-center mb-20 text-secondary-content overflow-auto">
          <h2 className="md:text-xl">
            Get Inspired<br></br>
            Plan Your Next Adventure
          </h2>
          <h3 className="py-5">
            Search for tags to find other user's posts with the activities or
            place you want to explore
          </h3>
        </div>
        <div className="pt-20 mx-auto text-gray-600">
          <SearchForm onRequestSearch={requestSearch} />
        </div>
      </Hero>
      <div className="container">
        <div className="postContainer pb-5 overflow-auto ">
          <h2 className="text-bold text-2xl text-base-300 text-center my-4 pt-4">
            Most Recent Posts
          </h2>
          <div className="cardContainer md:pl-24 flex-wrap grid grid-cols-4 gap-3 py-3 text-secondary-content place-items-center md:flex">
            {queryData.map((post) => (
              <Link key={post.id} to={`/explore/viewpost/${post.id}`}>
                <ExploreCard
                  key={post.id}
                  title={post.title}
                  author={post.author.username}
                  tags={post.tags}
                  image={post.images[0]}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
