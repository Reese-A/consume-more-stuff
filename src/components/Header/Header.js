import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/user-actions';
import { saveState } from '../../localStorage';

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
    this.props.logoutUser();
    saveState({ user: {} });
    this.props.history.push('/');
  }

  render() {
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
        ) : null}

        <div id="header_logo">
          <Link to="/">CMS</Link>
        </div>

        {this.props.user.id ? (
          <div className="auth_elements">
            <div id="user_greeting"> Hello, {this.props.user.name} </div>
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
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
