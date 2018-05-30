import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header">
        <div id="header_logo">CMS</div>
        <div id="login_button">
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

export default Header;
