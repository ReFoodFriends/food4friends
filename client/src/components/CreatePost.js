import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../public/stylesheets/CreatePost.css';

// /api/post  postreq   { email, category, content } = req body   

const CreatePost = ({ user, setUser }) => {
  const email = user.email;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const postContent = document.querySelector('#post-content');
  const categoryInput = document.querySelector('#category-input');
  const titleInput = document.querySelector('#title-input');

  // TODO: handle posting logic here
  const handlePostClick = (e) => {
    e.preventDefault();
    axios.post('/api/post', { title, email, category, content })
      .then(response => {
        // const { data: posts } = response;
        // setUser({ ...user, posts: posts });
        console.log('Loggin state from create user', user);
      })
      .catch(err => console.log(err));
    postContent.value = '';
    categoryInput.value = '';
    titleInput.value = '';
    return;
  };

  const handleTextAreaChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form className="createPost__form" onSubmit={handlePostClick}>
      <h1>Share what you've made!</h1>
      <div id="createPost__title">
        <label htmlFor="title-input">What is this called?</label>
        <input id="title-input" type="text" placeholder="Creamy Chicken Alfredo" required onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div id="createPost__category-input">
        <label htmlFor="category-input">What type of food is this?</label>
        <input id="category-input" type="text" placeholder="Pasta" required onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div id="createPost__content">
        <label htmlFor="post-contentt">Tell us a bit about it!</label>
        <textarea
          id="post-content"
          value={content}
          onChange={handleTextAreaChange}
          type='text'
          rows="5"
        />
      </div>
      
      <button id="createPost__btn" type="submit">
        Share with my foodie friends
      </button>
    </form>
  );
};

export default CreatePost;
