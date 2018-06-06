import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadState } from '../../localStorage';
const PrivateRoute = props => {
  const { component: Component, user, ...rest } = props;
  const persistedState = loadState();
  return (
    <Route
      {...rest}
      render={props =>
        persistedState.user.id ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
