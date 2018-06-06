import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadUserItems } from '../../redux/actions/user-actions';

import Row from '../Row/Row';

import './AuthHome.css';

class AuthHome extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadUserItems(this.props.user.id);
  }
  render() {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthHome);
