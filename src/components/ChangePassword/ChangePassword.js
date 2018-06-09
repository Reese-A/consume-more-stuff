import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { updatePassword } from '../../redux/actions/user-actions';

import './ChangePassword.css';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      newPassword: '',
      confirm: '',
      id: this.props.match.params.id,
      hideErr: true,
      email: ''
    };

    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.newPasswordChangeHandler = this.newPasswordChangeHandler.bind(this);
    this.confirmChangeHandler = this.confirmChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  emailChangeHandler(event) {
    const { value } = event.target;
    this.setState({ email: value });
  }

  passwordChangeHandler(event) {
    const { value } = event.target;
    this.setState({ password: value });
  }

  newPasswordChangeHandler(event) {
    const { value } = event.target;
    this.setState({ newPassword: value });
  }

  confirmChangeHandler(event) {
    const { value } = event.target;
    this.setState({ confirm: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if (this.state.newPassword === this.state.confirm) {
      return fetch(`/api/user/${this.state.id}/password`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            return this.props.history.push(`/user/${this.state.id}/home`);
          }
        })
        .catch(err => console.log(err));
    } else {
      return this.setState({
        hideErr: false
      });
    }
  }

  render() {
    return (
      <form id="password_form" onSubmit={this.handleSubmit}>
        <div id="password_title">Change your password</div>
        <input
          type="email"
          required
          id="password_email"
          name="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.emailChangeHandler}
        />

        <br />
        <input
          type="password"
          required
          id="password_current"
          name="password"
          placeholder="Current Password"
          value={this.state.password}
          onChange={this.passwordChangeHandler}
        />
        <br />

        <input
          type="password"
          required
          id="password_new"
          name="newPasword"
          placeholder="New Password"
          value={this.state.newPassword}
          onChange={this.newPasswordChangeHandler}
        />
        <br />

        <input
          type="password"
          required
          id="password_confirm"
          name="confirm"
          placeholder="Confirm New Password"
          value={this.state.confirm}
          onChange={this.confirmChangeHandler}
        />
        <br />

        <div hidden={this.state.hideErr}>Passwords must match</div>
        <button id="submit_password" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

// const mapDispatchToProps = dispatch => {
//   return {
//     updatePassword: data => {
//       dispatch(updatePassword(data));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  null
)(ChangePassword);
