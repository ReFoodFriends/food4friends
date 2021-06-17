import React from 'react';

const Post = ({ content, category, date }) => {
  return (
    <article style={style.post}>
      <h3>{category}</h3>
      <p>{content}</p>
      <h5>{date}</h5>
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
