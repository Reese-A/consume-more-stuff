import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header">
        <div id="header_logo">CMS</div>
        <a id="login_button">
          <Link to="/login">Login</Link>
        </a>
      </div>
    );
  }
}

export default Header;
