import React from 'react';

import '../../public/stylesheets/Post.css';


const Post = ({ title, content, category, date }) => {
  return (
    <article className="post">
      <h3>{title}</h3>
      <p>{content}</p>
      <div className="post__meta">
        <h5>{date}</h5>
        <i className="fas fa-circle"></i>
        <h5>{category}</h5>
      </div>
    </article>
  );
};


const style = {
  content: {
    padding: '36px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  h1: {
    marginBottom: '12px',
    marginTop: '0',
    textAlign: 'center',
    opacity: '0.75',
  },
  post: {
    backgroundColor: 'hsla(31, 2%, 92%, 1)',
    padding: '12px',
    borderRadius: '10px',
    border: 'solid hsla(31, 100%, 56%, 1)',
  },
};

export default Post;
