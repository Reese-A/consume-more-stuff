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
      <div id="new_item">
        <span id="new_item_title">Add An Item</span>
        <form>
          <input type="text" name="description" required />
          <input type="number" name="price" />
          <input type="text" name="units" />

          <input type="text" name="make" />
          <input type="text" name="model" />
          <input type="text" name="dimensions" />
          <textarea type="text" name="notes" />
          <input type="file" name="img" />

          <select name="category" id="new_item_category" required>
            {categoryOptions}
          </select>
          <select name="condition" id="new_item_condition" required>
            {conditionOptions}
          </select>
          <button type="submit">Add Item</button>
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
