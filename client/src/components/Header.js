import React from 'react';
import { Link } from 'react-router-dom';
// import { useCookies } from "react-cookie";

import '../../public/stylesheets/Header.css';


const Header = ({ loggedIn, setUser }) => {

  // const [removeCookie] = useCookies(['SSID']);
  // TODO: sign out from Google OAuth API
  const handleLogoutClick = (e) => {
    e.preventDefault();
    if(loggedIn) {
      setUser({ loggedIn: false, email: null});
      delete_cookie('SSID');
    }
  };

  const delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to='/'>
            foodie friends
        </Link>
      </h1>
      {loggedIn && (
        <button className="navbar__logout" onClick={handleLogoutClick}>
            Log Out
        </button>
      )}
    </nav>
  );
};

export default Header;
