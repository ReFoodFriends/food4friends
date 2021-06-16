import React, { useState, useEffect } from 'react';
import Post from './Post';
import './MyPosts.css';


const MyPosts = ({ user }) => {
  const postsArr = user.posts.map((post, idx) => <Post key={idx} content={post.content} date={post.date} category={post.category} />);

  return (
    <div style={style.postContainer}>
      {postsArr}
    </div>
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
  postContainer: {
    padding: '15px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: '12px',
  },
  post: {
    backgroundColor: 'hsla(31, 2%, 92%, 1)',
    padding: '12px',
    borderRadius: '10px',
    border: 'solid hsla(31, 100%, 56%, 1)',
  },
};

export default MyPosts;
