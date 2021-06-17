import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import FindFriend from './FindFriend';
import ShowPosts from './ShowPosts';
import MyPosts from './MyPosts';
import axios from 'axios';

import '../../public/stylesheets/Tabs.css';

const Tabs = ({ user, setUser }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const { email } = user;

  console.log('logging state from tabs.js', user);

  return (
    <main className="tabs__screen">
      <section className="tabs__container">
        <Link
          to='/'
          className="tab"
          onClick={() => setCurrentTab(0)}

          style={currentTab === 0 ? style.active : style.tab}
        >
          <i className="fas fa-plus"></i>
        </Link>
        <Link
          to='/'
          className="tab"
          onClick={() => setCurrentTab(1)}
          style={currentTab === 1 ? style.active : style.tab}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <i className="fas fa-globe"></i>
        </Link>
        <Link
          to='/'
          className="tab"
          onClick={() => setCurrentTab(2)}
          style={currentTab === 2 ? style.active : style.tab}
        >
          <i className="fas fa-inbox"></i>
        </Link>
        <Link
          to='/'
          className="tab"
          onClick={() => setCurrentTab(3)}
          style={currentTab === 3 ? style.active : style.tab}
        >
          <i className="fas fa-user-plus"></i>
        </Link>
      </section>
      <section className="tabs__content">
        {currentTab === 0 && <CreatePost user={user} setUser={setUser} />}
        {currentTab === 1 && <ShowPosts />}
        {currentTab === 2 && <MyPosts user={user} />}
        {currentTab === 3 && <FindFriend />}
      </section>
    </main>
  );
};

const style = {
  tab: {
    width: '100%',
    padding: '1rem',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: 'none',
    background: 'linear-gradient(to right, #4c5aca, #7751c2, #9747b6, #b03ca7, #c33096, #d22c87, #dd2d78, #e43468, #ea4459, #ed554b, #ed663d, #e97731)',
    transition: 'all 200ms ease-out'
  },
  active: {
    transform: 'translateY(-3px)',
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
  },
  content: {
    width: '80vw',
    minHeight: '70vh',
  },
  h1: {
    fontWeight: '300',
  },
  loginButton: {
    color: 'black',
    opacity: '0.75',
  },
};

export default Tabs;
