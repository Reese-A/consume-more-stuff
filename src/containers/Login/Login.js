import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveState, loadState } from '../../localStorage';
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
    event.preventDefault();
    return fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(user => {
        saveState({ user });
        return this.props.history.push(`/`);
      })
      .catch(err => {
        console.log(err);
      });
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
