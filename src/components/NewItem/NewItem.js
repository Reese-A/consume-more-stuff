import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { newItem } from '../../redux/actions/item-actions';

import './NewItem.css';

class NewItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="new_item" className="new_item">
        NEW ITEM
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     categories: state.category
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    newItem: data => {
      dispatch(newItem(data));
    }
  };
};
export default connect(null, mapDispatchToProps)(NewItem);
