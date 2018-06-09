import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveState } from '../../localStorage';
import { withRouter } from 'react-router-dom';

import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      confirm: '',
      hideErr: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.confirmChangeHandler = this.confirmChangeHandler.bind(this);
  }

  emailChangeHandler(event) {
    const { value } = event.target;
    this.setState({ email: value });
  }

  nameChangeHandler(event) {
    const { value } = event.target;
    this.setState({ name: value });
  }

  passwordChangeHandler(event) {
    const { value } = event.target;
    this.setState({ password: value });
  }

  confirmChangeHandler(event) {
    const { value } = event.target;
    this.setState({ confirm: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.confirm) {
      return fetch('/api/user/register', {
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
          this.props.history.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return this.setState({
        hideErr: false
      });
    }
  }

  render() {
    return (
      <form id="register_form" onSubmit={this.handleSubmit}>
        <div id="register_title">Register new user</div>
        <input
          type="email"
          required
          id="register_email"
          name="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.emailChangeHandler}
        />
        <br />

        <input
          type="text"
          required
          id="register_name"
          name="name"
          placeholder="username"
          value={this.state.name}
          onChange={this.nameChangeHandler}
        />
        <br />

        <input
          type="password"
          required
          id="register_password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.passwordChangeHandler}
        />
        <br />

        <input
          type="password"
          required
          id="register_confirm"
          name="confirm"
          placeholder="confirm password"
          value={this.state.confirm}
          onChange={this.confirmChangeHandler}
        />
        <br />

        <div hidden={this.state.hideErr}>Passwords must match</div>
        <button id="submit_register" type="submit">
          Submit
        </button>
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
  )(Register)
);
