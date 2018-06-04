import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser, loginUser } from '../../redux/actions/user-actions';
import { saveState } from '../../localStorage';

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

  componentDidUpdate() {
    const user = this.props.user ? this.props.user : {};
    saveState({ user: user });
    if (Object.keys(user).length > 0) {
      this.props.history.push('/');
    }
  }

  handleSubmit(event) {
    console.log('submit fired');
    event.preventDefault();
    if (this.state.password === this.state.confirm) {
      this.props.registerUser(this.state);
      console.log('REGISTER FINISHED');
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
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: data => {
      dispatch(registerUser(data));
    },
    loginUser: data => {
      dispatch(loginUser(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
