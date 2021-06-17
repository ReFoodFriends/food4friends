import React from 'react';
import Post from './Post';

import '../../public/stylesheets/Feed.css';


const dummyFeedData = {
  title: 'Dummy Title',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet elementum purus, sed pellentesque massa. Suspendisse felis est, vulputate dapibus iaculis at, volutpat eget justo. Aliquam a tellus vel leo auctor ornare. Integer felis enim, tincidunt malesuada diam porttitor, iaculis lacinia lectus.',
  date: new Date().toDateString(),
  category: 'Dummy Data'
};

const Feed = () => {
  return (
    <section className="feed__screen">
      <div className="feed__container">
        <Post date={dummyFeedData.date} content={dummyFeedData.content} category={dummyFeedData.category} title={dummyFeedData.title}/>
        <Post date={dummyFeedData.date} content={dummyFeedData.content} category={dummyFeedData.category} title={dummyFeedData.title}/>
        <Post date={dummyFeedData.date} content={dummyFeedData.content} category={dummyFeedData.category} title={dummyFeedData.title}/>
        <Post date={dummyFeedData.date} content={dummyFeedData.content} category={dummyFeedData.category} title={dummyFeedData.title}/>
        <Post date={dummyFeedData.date} content={dummyFeedData.content} category={dummyFeedData.category} title={dummyFeedData.title}/>
        <Post date={dummyFeedData.date} content={dummyFeedData.content} category={dummyFeedData.category} title={dummyFeedData.title}/>
      </div>
    </section>
  );
};

export default Feed;
