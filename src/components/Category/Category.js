import React from 'react';
import { connect } from 'react-redux';

import Row from '../Row/Row';

class Category extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.match.params.name);
    return (
      <div id="category">
        <h1>{this.props.match.params.name}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
    items: state.item
  };
};

export default connect(mapStateToProps, null)(Category);
