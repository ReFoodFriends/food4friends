import React, { useState } from 'react';
import FriendResult from './FriendResult';

import '../../public/stylesheets/FindFriend.css';


const FindFriend = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(['a']);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // TODO: backend logic to add friend
  const handleAddFriend = () => {
  
  };

  return (
    <section className="findFriend__screen">
      <h1>Search for a fellow foodie!</h1>
      <form className="findFriend__form">
        <input
          onChange={handleSearchChange}
          value={search}
          type='text'
        />
        <button type="submit">find foodie</button>
      </form>
      {results.length !== 0 &&
        results.map((foodie, index) => (
          <div className="findFriend__result-container" key={index}>
            <FriendResult />
            <FriendResult />
            <FriendResult />
            <FriendResult />
            <FriendResult />
            <FriendResult />
            <FriendResult />
          </div>
        ))}
    </section>
  );
};

export default FindFriend;
