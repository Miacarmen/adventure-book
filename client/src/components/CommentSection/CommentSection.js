import React from "react";
import CommentEntry from "./CommentEntry";

const CommentSection = ({ comments = [], onUpdatePost }) => {
  if (!comments.length) {
    return <h3 className="py-3">No Comments Yet</h3>;
  }

  return (
    <>
      <div>
        <h3 className="display-inline-block w-fit text-lg font-semibold pb-2">
          Comments
          <span className="text-base-300 text-md font-light pl-3">
            ({comments.length})
          </span>
        </h3>
      </div>
      <div className="ml-5">
        {comments &&
          comments.map((comment) => (
            <CommentEntry
              key={comment.id}
              comment={comment}
              onUpdatePost={onUpdatePost}
            />
          ))}
      </div>
    </>
  );
};

export default CommentSection;
