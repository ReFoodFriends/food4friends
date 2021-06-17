import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';


import '../../public/stylesheets/Feed.css';



const dummyFeedData = {
  title: 'Dummy Title',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet elementum purus, sed pellentesque massa. Suspendisse felis est, vulputate dapibus iaculis at, volutpat eget justo. Aliquam a tellus vel leo auctor ornare. Integer felis enim, tincidunt malesuada diam porttitor, iaculis lacinia lectus.',
  date: new Date().toDateString(),
  category: 'Dummy Data'
};
// email is the current user's email -> user.email
// '/api/getFollowPosts/:email' -> get request -> return response { result: [{title, category, content, date, name, email}] }
const Feed = ({ user }) => {
  const [friendsPosts, setFriendsPost] = useState([]);

  useEffect(() => {
    axios.get(`/api/getFollowPosts/${user.email}`)
    .then( (response) => {
      console.log('loggin response from feed' ,response);
      const { data } = response;
      setFriendsPost(data);
    })
    .catch(err => console.log(err));
  }, []);

  const friendsPostsArr = friendsPosts.map((post, idx) => <Post key={idx} title={post.title} content={post.content} date={post.date} category={post.category} name={post.name} email={post.email} />);

  return (
    <section className="feed__screen">
      <div className="feed__container">
       {friendsPostsArr}
      </div>
    </section>
  );
};

export default Feed;
