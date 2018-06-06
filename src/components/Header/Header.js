import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/user-actions';
import { saveState } from '../../localStorage';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutUser();
    saveState({ user: {} });
    this.props.history.push('/');
  }

  render() {
    return (
      <header id="header">
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
