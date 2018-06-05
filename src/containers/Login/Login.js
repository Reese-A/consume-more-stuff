import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/user-actions';
import { saveState } from '../../localStorage';
import { withRouter } from 'react-router-dom';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
  }

  emailChangeHandler(event) {
    const { value } = event.target;
    this.setState({ email: value });
  }

  passwordChangeHandler(event) {
    const { value } = event.target;
    this.setState({ password: value });
  }

  handleSubmit(event) {
    console.log('submit fired');
    event.preventDefault();
    this.props.loginUser(this.state);
    console.log('LOGIN FINISHED');
  }

  componentDidUpdate() {
    const user = this.props.user ? this.props.user : {};
    saveState({ user: user });
    if (Object.keys(user).length > 0) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <form id="login_form" onSubmit={this.handleSubmit}>
        <div id="login_title">Login as existing user</div>
        <input
          id="login_email"
          type="email"
          name="email"
          placeholder="email"
          required
          value={this.state.email}
          onChange={this.emailChangeHandler}
        />
        <br />

        <input
          id="login_password"
          type="password"
          name="password"
          placeholder="password"
          required
          value={this.state.password}
          onChange={this.passwordChangeHandler}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
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
    loginUser: data => {
      dispatch(loginUser(data));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
