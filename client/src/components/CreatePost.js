import React, { useState, useEffect } from 'react';
import axios from 'axios';

// /api/post  postreq   { email, category, content } = req body   

const CreatePost = ({ user, setUser }) => {
  const email = user.email;
  const [content, setContent] = useState('');
  const [category, setCategory] = useState();
  // TODO: handle posting logic here
  const handlePostClick = (e) => {
    e.preventDefault();
    axios.post('/api/post', { email, category, content })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  };

  const handleTextAreaChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form style={style.content} onSubmit={handlePostClick}>
      <h1 style={style.h1}>what did you make?</h1>
      <textarea
        value={content}
        onChange={handleTextAreaChange}
        style={style.textarea}
        type='text'
      />
      <div id="createPost__category-input">
        <label htmlFor="category-input">What type of food is this?</label>
        <input id="category-input" type="text" placeholder="Pasta" required onChange={(e) => setCategory(e.target.value)}/>
      </div>
      <button type="submit" style={style.share}>
        Share with my foodie friends
      </button>
    </form>
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
  textarea: {
    width: '100%',
    minHeight: '45vh',
    border: 'solid hsla(31, 100%, 56%, 1)',
    borderRadius: '10px',
    backgroundColor: 'hsla(31, 2%, 92%, 1)',
  },
  share: {
    marginTop: '24px',
    color: 'white',
    backgroundColor: 'hsla(31, 100%, 56%, 1)',
    border: 'solid hsla(31, 100%, 56%, 1)',
    borderRadius: '10px',
    padding: '16px',
    fontSize: '18px',
  },
};

export default CreatePost;
