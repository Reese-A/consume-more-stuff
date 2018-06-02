import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { newItem } from '../../redux/actions/item-actions';

import './NewItem.css';

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(data) {
    console.log(data);
  }

  render() {
    const categoryOptions = this.props.categories.map(category => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });

    const conditionOptions = this.props.conditions.map(condition => {
      return (
        <option key={condition.id} value={condition.id}>
          {condition.name}
        </option>
      );
    });
    return (
      <div className="new_item">
        <form>
          <input type="text" />
          <input type="text" />
          <select name="category" id="new_item_category">
            {categoryOptions}
          </select>
          <select name="condition" id="new_item_condition">
            {conditionOptions}
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
    conditions: state.condition
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newItem: data => {
      dispatch(newItem(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
