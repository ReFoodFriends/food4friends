import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import './Login.css';

const Login = ({ setUser }) => {
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
    <main style={style.main}>
      <section style={style.section}>
        <h1 style={style.h1}>See what&apos;s cookin&apos;{'  '}</h1>
        <form onSubmit={null}>
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" placeholder='Email' id="email" type="email" autoComplete="off" required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" placeholder='Password' id="password" type="password" required/>
          </div>
          <div>
            <button id="login__btn" type="submit"> Login </button>
            <span id="signup-redirect">Not a User? <Link to='/signup' id="login-form__signup-btn">Sign Up</Link> </span>
          </div>
          <div className="signup__message">
          </div>
        </form>
        <hr></hr>
        <Button
          variant='contained'
          style={style.loginButton}
          onClick={handleSignInClick}
        >
          Sign in with Google
        </Button>
      </section>
    </main>
  );
};

const style = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    backgroundColor: 'white',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
    backgroundColor: 'hsla(31, 2%, 88%, 1)',
    border: 'solid hsla(31, 100%, 56%, 1)',
    padding: '36px 60px',
    borderRadius: '8px',
  },
  loginButton: {
    color: 'white',
    opacity: '0.75',
    backgroundColor: 'hsla(28, 100%, 54%, 1)',
  },
};

export default Login;
