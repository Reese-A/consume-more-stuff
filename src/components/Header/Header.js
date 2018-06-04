import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/user-actions';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutUser();
    localStorage.removeItem('state');
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
          <a id="logout_button" onClick={this.logout}>
            Logout
          </a>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
