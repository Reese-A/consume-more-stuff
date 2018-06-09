import React from 'react';
import { connect } from 'react-redux';

import { saveState, loadState } from '../../localStorage';

import './Verify.css';

class AuthHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: false,
      user: null,
      checked: false
    };
  }
  componentDidMount() {
    const params = new URL(document.location).searchParams;
    const hash = params.get('hash');
    const id = Number(params.get('id'));

    fetch(`/api/user/${id}/verify?hash=${hash}`, {
      method: 'PUT',
      body: JSON.stringify({ hash, id }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(verified => {
        this.setState(verified, () => {});
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.verified) {
      const user = loadState().user;
      user.verified = this.state.verified;
      saveState({ user });

      setTimeout(() => {
        console.log(this.state);

        this.props.history.push('/');
      }, 3000);
    }
    // if (prevProps.items === this.props.items) {
    // }
  }

  render() {
    console.log(this.state);
    let verify = null;
    if (!this.state.verified && !this.state.checked) {
      verify = (
        <div id="verify_text">
          {/* Verifying */}
          <span>V</span>
          <span>e</span>
          <span>r</span>
          <span>i</span>
          <span>f</span>
          <span>y</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      );
    }
    if (!this.state.verified && this.state.checked) {
      verify = <div id="verify_text">Could not verify account</div>;
    }

    if (this.state.verified && this.state.checked) {
      verify = <div id="verify_text">Account Verified</div>;
    }
    return <div id="verify">{verify}</div>;
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
