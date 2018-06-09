import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveState, loadState } from '../../localStorage';

import MenuButton from '../MenuButton/MenuButton';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // width: window.innerWidth,
      // height: window.innerHeight
    };
    this.logout = this.logout.bind(this);
    // this.updateDimensions = this.updateDimensions.bind(this);
  }
  // updateDimensions(event) {
  //   this.setState(
  //     { width: window.innerWidth, height: window.innerHeight },
  //     () => {
  //       console.log(this.state);
  //     }
  //   );
  // }
  componentDidMount() {
    // window.addEventListener('resize', this.updateDimensions);
    console.log();
  }

  logout() {
    // this.props.logoutUser();
    return fetch('/api/user/logout', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(res => {
        saveState({ user: {} });
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const user = loadState().user;
    return (
      <header id="header">
        {/* {this.state.width > 600 ? (
          <div id="header_logo">
            <Link to="/">CMS</Link>
          </div>
        ) : (
          <div id="menu_button_container">
            <MenuButton />
          </div>
        )} */}

        {this.props.enableMenuButton ? (
          <div id="header_menu_button">
            <MenuButton />
          </div>
        ) : (
          <div id="header_menu_button">
            <Link to="/">CMS</Link>
          </div>
        )}

        <div id="header_logo">
          <Link to="/">CMS</Link>
        </div>

        {user.id ? (
          <div className="auth_elements">
            <div id="user_greeting"> Hello, {user.name} </div>
            <a id="logout_button" onClick={this.logout}>
              Logout
            </a>
          </div>
        ) : (
          <div className="auth_elements">
            <Link id="login_button" to="/login">
              Login
            </Link>
            <Link id="register_button" to="/register">
              Register
            </Link>
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    // user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
