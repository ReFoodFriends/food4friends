import React, { useState } from 'react';
import FriendResult from './FriendResult';
import axios from 'axios';

import '../../public/stylesheets/FindFriend.css';


const FindFriend = ({ user, setUser }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { email: userEmail } = user;
  const cancelBtn = document.querySelector('#findFriends__cancel-btn');
  const searchInput = document.querySelector('#findFriends__search-input');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // '/api/findPeople/:name/:email'
    // response => array [{email, name}]
    if (e.target.value) {
      axios.get(`/api/findPeople/${e.target.value}/${userEmail}`)
      .then(response => {
        const { data } = response;
        setResults(data.alreadyFollow);
        console.log(data.alreadyFollow);
      })
      .catch(error => console.log());
    } else {
      setResults([]);
    }
  };

  // TODO: backend logic to add friend
  const handleAddFriend = () => {
  
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    if(searchInput.value){
      setSearch('');
      searchInput.value ='';
      setResults([]);
    }
  }

  return (
    <section className="findFriend__screen">
      <h1>Search for a fellow foodie!</h1>
      <form className="findFriend__form">
        <input
          id="findFriends__search-input"
          onChange={handleSearchChange}
          type='text'
          placeholder="Search"
        />
        { search && <button onClick={cancelHandler} id="findFriends__cancel-btn">Cancel</button>}
      </form>
      <div className="findFriend__result-container" >
        {results.length !== 0 &&
          results.map((foodie, index) => (
            
              <FriendResult key={index} name={foodie.name} email={foodie.email} user={user} setUser={setUser}/>
          ))}
      </div>
    </section>
  );
};

export default FindFriend;
