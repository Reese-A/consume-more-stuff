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
    const { hash } = parse;
    fetch(`/user/verify?hash=${hash}`, {
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(verify => {
        const { verified } = verify;
        this.setState({ verified }, () => {
          console.log(this.state);
        });
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
