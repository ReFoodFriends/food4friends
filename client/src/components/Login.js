import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../public/stylesheets/Login.css';
import googLogo from '../../public/assets/search.png';


const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // /aoi/login    post request    { email, password }
  // Handle manual login
  const formSignIn = (e) => {
    e.preventDefault();

    axios.post('/api/login', { email, password })
      .then(response => {
        console.log('response from login page', response);
        // console.log('state before setting user at login', user);
        // console.log('checking if set user is defined', setUser);
        setUser({ ...user, loggedIn: true, email: email, posts: response.data.posts });
        console.log('logging users from login.js', user);
      })
      .catch(err => console.log(err));
  };


  // Handle SIGNIN for Google OAuth
  const handleSignInClick = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id:
            '145574284947-h6h200ppacfsrhhn9g6d9qf3gq2d2lma.apps.googleusercontent.com',
        })
        .then((googleAuth) => {
          googleAuth
            .signIn()
            .then((googleUser) => {
              console.log({ googleUser });
              const authToken = googleUser.getAuthResponse().id_token;
              // TODO: send googleUser to server, then send back user object from database
              // fetch('/api/login', {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify(googleUser),
              // });
              // TODO: once user object is received from database, pass user object as argument to setUser
              // TODO: set some user id in local storage or ssid cookie
              setUser({ loggedIn: true });
            })
            .catch(({ error }) => console.log({ error }));
        });
    });
  };

  return (
    <main className="login__screen">
      <section className="login__form-container">
        <h1>See what&apos;s cookin&apos;</h1>
        <form onSubmit={formSignIn} id="login-form">
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" placeholder='Email' id="email" type="email" autoComplete="off" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" placeholder='Password' id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button id="login__btn" type="submit">Login </button>
            <span id="signup-redirect">Not a User? <Link to='/signup' id="login-form__signup-btn">Sign Up</Link> </span>
          </div>
          <div className="signup__message">
          </div>
        </form>
        <button className="login__google" onClick={handleSignInClick}>
          <img src={googLogo}/> Sign in with Google
        </button>
      </section>
    </main>
  );
};

export default Login;
