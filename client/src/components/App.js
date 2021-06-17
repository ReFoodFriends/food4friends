import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import Tabs from './Tabs';
// import CreatePost from './CreatePost';

import '../../public/stylesheets/App.css';


import axios from 'axios';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';

const App = () => {
  // TODO: add necessary user fields
  // TODO: refactor to context API
  const [user, setUser] = useState({
    loggedIn: false,
    email: null,
    name: null,
    posts: [],
  });

  console.log('state in app', user);

  useEffect(() => {
    axios.get('/api/verifyWithCookie')
      .then(response => {
        const { data: { email } } = response;
        setUser({ ...user, loggedIn: true, email: email, posts: response.data.posts });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Router>
      <Header loggedIn={user.loggedIn} setUser={setUser} />
      <Switch>
        {/* <Route path='/create-post'>
          <CreatePost user={user} setUser={setUser} />
        </Route> */}
        <Route path='/signup'>
          {user.loggedIn ? <Tabs user={user} setUser={setUser} /> : <SignUp user={user} setUser={setUser} />}
        </Route>
        <Route exact path='/'>
          {user.loggedIn ? <Tabs user={user} setUser={setUser} /> : <Login user={user} setUser={setUser} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
