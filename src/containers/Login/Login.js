import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

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

  render() {
    return (
      <form id="login_form" onSubmit={this.handleSubmit}>
        <div id="login_title">Login as existing user</div>
        <label htmlFor="login_email">Email: </label>
        <input
          id="login_email"
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.emailChangeHandler}
        />
        <br />

        <label htmlFor="login_password">Password: </label>
        <input
          id="login_password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.passwordChangeHandler}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Login;
