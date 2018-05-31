import React from 'react';

const CommentForm = ({ handleChange, handleSubmit, comment }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="text">Got Something to say about this Soirée?</label>
        <textarea className="textarea" id="text" name="text"
          placeholder="Leave your comments here!"  onChange={handleChange} value={comment.text || ''}/>
      </div>
      <button className="button is-small is-rounded is-black">Submit</button>
    </form>
  );
};

export default CommentForm;
