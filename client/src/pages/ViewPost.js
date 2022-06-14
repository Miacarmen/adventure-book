// TO-DO: update carousel for this posts images
// TO-DO: allow user to save this post to their dashboard
import React from "react";
import { Hero, Badge } from "react-daisyui";
import "../App.css";
import SimpleImageSlider from "react-simple-image-slider";

import CommentSection from "../components/CommentSection/CommentSection";
import CommentForm from "../components/CommentForm/CommentForm";
import Map from "../components/Map";
import Bookmark from "../components/Bookmark";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";

const ViewPost = () => {
  // Use useParams to retrieve value of the route parameter ':postId'
  const { postId } = useParams();

  const query = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });
  const { loading, data } = query;
  const post = data?.post || {};

  function requeryPost() {
    query.refetch();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  function makeCarouselImageData(images) {
    const imageData = [];
    for (let image of images) {
      imageData.push({ url: image });
    }
    return imageData;
  }

  return (
    <div className="container text-neutral-content">
      <div>
        <Hero className="mb-28">
          <div className="postContainer bg-base-200  mx-7 my-9 pt-4 px-5 pb-7 ">
            <div>
              <div>
                <Bookmark postId={postId} />
              </div>
              <h2 className="text-semibold text-3xl text-neutral-content">
                {post.title}
              </h2>
              {/* <p>{post.author.username}</p> */}
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="badge badge-outline text-base-300 mr-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className=" px-3">
              <div className="slider h-vh py-4 ">
                <SimpleImageSlider
                  width={820}
                  height={700}
                  images={makeCarouselImageData(post.images)}
                  showBullets={true}
                  showNavs={true}
                  overflow="hidden"
                />
                <div className="pt-6 ">
                  <div className="bg-base-100 mb-3 place-items-center">
                    <p className="">{post.createdAt}</p>
                    <div className="">
                      <h3 className="pl-8 py-6 max-w-lg md:max-w-2xl overflow-auto md:scroll-auto">
                        {post.content}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-indigo-400 pb-2 font-semibold">
                See My Pinned Locations Below
              </p>
              <div title="Scroll out to see this user's pinned locations!">
                <Map
                  height="600px"
                  width="820px"
                  center={[post.location.latitude, post.location.longitude]}
                  locations={[
                    [post.location.latitude, post.location.longitude],
                  ]}
                  onClick={() => {}}
                />
              </div>
              <div className="container bg-base-100 px-8 mt-4 py-3">
                <div className="flex">
                  <CommentSection
                    comments={post.comments}
                    onUpdatePost={requeryPost}
                  />
                </div>
                <div className="pb-7 pt-5">
                  <CommentForm postId={postId} />
                </div>
              </div>
            </div>
          </div>
        </Hero>
      </div>
    </div>
  );
};

export default ViewPost;
