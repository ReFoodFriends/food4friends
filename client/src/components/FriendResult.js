import React, { useEffect, useState } from 'react'
import axios from 'axios';

import '../../public/stylesheets/FriendResult.css';

const FriendResult = ({ name, email, user }) => {
// { followee: their emails ,follower: their email } req body
// '/api/checkFollow/:followee/:follower'
// followee = email    follower = user.email
  const [follow, setFollow] = useState(null);

  useEffect(() => {
    axios.get(`/api/checkFollow/${email}/${user.email}`)
    .then(response =>{
      console.log('response after foodie mounts', response);
      const { data } = response;
      setFollow(data.result);
    })
    .catch(err => console.log(err));
  }, []);

  const followFriendHandler = () => {
    // '/api/followUser'  { followee: ,follower: } in req body
    if(!follow) {
      axios.post(`/api/followUser`, {followee: email, follower: user.email})
      .then(response => {
        if(response.data) setFollow(true);
      })
      .catch(err => console.log(err));
    } else {
      // '/api/unfollowUser'  -> put request ->  { followee: ,follower: } in req body
      axios.put(`/api/unfollowUser`, {followee: email, follower: user.email})
      .then(response => {
        if(response.data) setFollow(false);
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <div>
      <article className="search__result">
        <div className="results__user-info">
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
        <button onClick={followFriendHandler}>
          {follow ? <i className="fas fa-user-slash"></i> : <i className="fas fa-plus"></i>}
        </button>
      </article>
    </div>
  )
}

// if email is followed <i class="fas fa-user-slash"></i> : <i className="fas fa-plus"></i

export default FriendResult
