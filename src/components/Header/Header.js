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
        <div id="header_logo">CMS</div>
        <div id="login_button">
          <Link to="/login">Login</Link>
        </div>
      </header>
    );
  }
}

export default Header;
