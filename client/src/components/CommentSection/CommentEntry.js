import React from "react";
import { TiDelete } from 'react-icons/ti';
import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT } from "../../utils/mutation";

const CommentEntry = ({ comment, onUpdatePost }) => {
  const [deleteComment, { error }] = useMutation(REMOVE_COMMENT);

  const handleDeleteComment = async (event) => {
    event.preventDefault();

    try {
      await deleteComment({
        variables: { commentId: comment.id }
      });
      onUpdatePost();
    } catch (err) {
      console.error(err);
      console.error(error);
    }
  };
  return (
    <div key={comment.id}>
      <div>
        <h5 className="comment-header font-medium">
          {comment.commentAuthor.username}
          <span className="font-light pl-2">commented</span>
        </h5>
        <p className="comment-body bg-base-200 rounded-full pl-3 ml-3">
          {comment.commentText} 
          <TiDelete className="float-right mr-1 text-accent hover:text-accent-focus" size={23}
            onClick={handleDeleteComment}/>
        </p>
      </div>
    </div>
  );
};

export default CommentEntry;
