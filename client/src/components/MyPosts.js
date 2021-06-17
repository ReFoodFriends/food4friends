import React, { useState, useEffect } from 'react';
import Post from './Post';
import '../../public/stylesheets/MyPosts.css';



const MyPosts = ({ user }) => {
  const postsArr = user.posts.map((post, idx) => <Post key={idx} content={post.content} date={post.date} category={post.category} />);

  return (
    <div className="my-posts__post-container">
      {postsArr}
    </div>
  );
};

export default MyPosts;
