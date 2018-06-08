import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import qs from 'query-string';

import './Verify.css';

class AuthHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: false
    };
  }
  componentDidMount() {
    const parse = qs.parse(this.props.location.search);
    const { hash, id } = parse;
    fetch(`/user/${id}/verify?hash=${hash}`, {
      method: 'PUT',
      body: { hash, id },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(verified => {
        console.log(verified);
        // this.setState({ verified }, () => {
        //   console.log(this.state);
        // });
      });
  }
  render() {
    return <div id="verify">VERIFY</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthHome);
