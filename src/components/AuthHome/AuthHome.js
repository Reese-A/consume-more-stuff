import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { loadUserItems } from '../../redux/actions/user-actions';
import { loadState } from '../../localStorage';

import Row from '../Row/Row';

import './AuthHome.css';

class AuthHome extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.items === this.props.items) {
      this.props.loadUserItems(this.props.match.params.id);
    }
  }
  componentDidMount() {
    this.props.loadUserItems(this.props.match.params.id);
  }
  render() {
    const persistedState = loadState();
    if (persistedState.user.id !== Number(this.props.match.params.id)) {
      return <Redirect to={`/user/${persistedState.user.id}/home`} />;
    }
    return (
      <div id="auth_home">
        {this.props.statuses.map(status => {
          return (
            <Row
              key={status.id}
              statusId={status.id}
              statusName={status.name}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    items: state.items,
    statuses: state.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserItems: id => {
      dispatch(loadUserItems(id));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthHome)
);
