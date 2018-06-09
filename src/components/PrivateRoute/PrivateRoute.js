import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadState } from '../../localStorage';
const PrivateRoute = props => {
  const { component: Component, ...rest } = props;
  const user = loadState().user;
  return (
    <Route
      {...rest}
      render={props =>
        user.verified ? (
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
  return {};
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
