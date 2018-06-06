import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChangePassword extends Component {}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
