import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header id="header">
        <div id="header_logo">
          <Link to="/">CMS</Link>
        </div>
        <div id="auth_buttons">
          <Link id="login_button" to="/login">
            Login
          </Link>
          <Link id="register_button" to="/register">
            Register
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
