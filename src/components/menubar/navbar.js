import React from 'react';
import { Link } from 'react-router-dom';


import "./navbar.scss";


function NavBar() {
  return (
    <nav className="navbar-container">
      <div className="landing-top-section">
        <Link className="homeNavLink" to="/about">
          About
        </Link>
        <Link className="homeNavLink" to="/login">
          Sign In
        </Link>
        <Link className="homeNavLink Signup" to="/register">
          Sign Up
        </Link>
      </div>
    </nav>
  )
}
   

export default NavBar
 
