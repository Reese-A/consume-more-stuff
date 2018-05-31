import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <form id="login_form" onSubmit={this.handleSubmit}>
        <label htmlFor="login_email" />
        <input
          type="text"
          name="email"
          id="login_email"
          value={this.state.email}
          onChange={this.emailChangeHandler}
        />

        <label htmlFor="login_password" />
        <input
          type="text"
          name="password"
          id="login_password"
          value={this.state.email}
          onChange={this.passwordChangeHandler}
        />
      </form>
    );
  }
}

export default Login;
