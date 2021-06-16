import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import Tabs from './Tabs';
// import CreatePost from './CreatePost';

const App = () => {
  // TODO: add necessary user fields
  // TODO: refactor to context API
  const [user, setUser] = useState({
    loggedIn: false,
    email: null,
    name: null,
    posts: null,
  });
  console.log(user);

  return (
    <Router>
      <CssBaseline />
      <Header loggedIn={user.loggedIn} />
      <Switch>
        {/* <Route path='/create-post'>
          <CreatePost user={user} setUser={setUser} />
        </Route> */}
        <Route path='/signup'>
          {user.loggedIn ? <Tabs user={user} setUser={setUser} /> : <SignUp setUser={setUser}/>}
        </Route>
        <Route exact path='/'>
          {user.loggedIn ? <Tabs user={user} setUser={setUser} /> : <Login setUser={setUser} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
