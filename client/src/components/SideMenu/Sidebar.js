import React from "react";
import "../../styles/Dashboard.css";
import { Badge } from "react-daisyui";

const Sidebar = (props) => {
  return (
    <div className="grid col-span-2 mt-5 mb-10">
      <div className="bg-base-200 ">
        <div className="bg-primary">
          <h2 className="pl-2">Saved Posts</h2>
        </div>
        <div className="place-items-center">
          <div className="pl-3 pt-3">
            {props.userCollection.map((post) => {
              return (
              <div key={[post.id]} className="card w-96 h-36 bg-base-100 shadow-xl savePost m-3">
                <div className="card-body p-5">
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.author.username}</p>
                  {post.tags.map((tag) => {
                    return <Badge key={tag} className="badge badge-outline">#{tag}</Badge>
                  })}
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
