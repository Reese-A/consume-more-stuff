import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      confirm: ''
    };

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

  render() {
    return (
      <form id="register_form" onSubmit={this.handSubmit}>
        <div id="register_title">Register new user</div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="register_email"
          name="email"
          value={this.state.email}
          onChange={this.emailChangeHandler}
        />
        <br />

        <label htmlFor="name">Username: </label>
        <input
          type="text"
          id="register_name"
          name="name"
          value={this.state.name}
          onChange={this.nameChangeHandler}
        />
        <br />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="register_password"
          name="password"
          value={this.state.password}
          onChange={this.passwordChangeHandler}
        />
        <br />

        <label htmlFor="confirm">Confirm Password: </label>
        <input
          type="password"
          id="register_confirm"
          name="confirm"
          value={this.state.confirm}
          onChange={this.confirmChangeHandler}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Register;
