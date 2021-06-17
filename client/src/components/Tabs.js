import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import FindFriend from './FindFriend';
import ShowPosts from './ShowPosts';
import MyPosts from './MyPosts';
import axios from 'axios';

const Tabs = ({ user, setUser }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const { email } = user;

  console.log('logging state from tabs.js', user);

  return (
    <main style={style.main}>
      <section style={style.tabs}>
        <Link
          to='/'
          onClick={() => setCurrentTab(0)}

          style={currentTab === 0 ? style.selected : style.tab}
        >
          Create Post
        </Link>
        <Link
          to='/'
          onClick={() => setCurrentTab(1)}
          style={currentTab === 1 ? style.selected : style.tab}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          My Feed
        </Link>
        <Link
          to='/'
          onClick={() => setCurrentTab(2)}
          style={currentTab === 2 ? style.selected : style.tab}
        >
          My Posts
        </Link>
        <Link
          to='/'
          onClick={() => setCurrentTab(3)}
          style={currentTab === 3 ? style.selected : style.tab}
        >
          Find Friends
        </Link>
      </section>
      <section style={style.content}>
        {currentTab === 0 && <CreatePost user={user} setUser={setUser} />}
        {currentTab === 1 && <ShowPosts />}
        {currentTab === 2 && <MyPosts user={user} />}
        {currentTab === 3 && <FindFriend />}
      </section>
    </main>
  );
};

const style = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '24px',
    paddingTop: '48px',
    height: '90vh',
    fontSize: '18px',
  },
  tabs: {
    display: 'flex',
    width: '80vw',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    padding: '12px',
    width: '100%',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'black',
    opacity: '0.75',
    backgroundColor: 'hsla(31, 2%, 88%, 1)',
    border: 'solid hsla(31, 100%, 56%, 1)',
  },
  selected: {
    padding: '12px',
    width: '100%',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: 'hsla(31, 100%, 56%, 1)',
    border: 'solid hsla(31, 100%, 56%, 1)',
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
