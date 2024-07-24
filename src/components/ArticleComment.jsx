import React from "react";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import axios from 'axios';

function ArticleComment({ comment }) {
  const { author, body, createdAt, id } = comment;
  const { authUser } = useAuth();

  const canDelete = author?.username === authUser?.username;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/comments/${id}`);
      // Handle successful deletion, e.g., remove the comment from the UI
      alert('Comment deleted');
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body} </p>
      </div>

      {id && (
        <div className="card-footer">
          <Link>{author.username}</Link>&nbsp;
          <span className="date-posted">{new Date(createdAt).toDateString()}</span>&nbsp;
          {canDelete && <button onClick={handleDelete}>Delete</button>}
        </div>
      )}
    </div>
  );
}

export default ArticleComment;
