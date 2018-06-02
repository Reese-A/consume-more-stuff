import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { newItem } from '../../redux/actions/item-actions';

import './NewItem.css';

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // description: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(data) {
    console.log(data);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
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
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
            required
          />
          <div id="new_item_price_container">
            <input
              type="number"
              name="price_value"
              placeholder="Price"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="price_units"
              placeholder="Units"
              onChange={this.handleChange}
            />
          </div>

          <input
            type="text"
            name="make"
            placeholder="Manufacturer"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="dimensions"
            placeholder="Dimensions"
            onChange={this.handleChange}
          />
          <textarea
            type="text"
            name="notes"
            placeholder="Product Notes"
            onChange={this.handleChange}
          />
          {/* <input type="file" name="img" placeholder="Image" /> */}
          <input
            type="url"
            name="img_url"
            placeholder="Image URL"
            onChange={this.handleChange}
          />

          <div id="new_item_category_container" className="select_container">
            <label htmlFor="new_item_category">Category</label>
            <select
              name="category"
              id="new_item_category"
              required
              onChange={this.handleChange}
            >
              {categoryOptions}
            </select>
          </div>
          <div id="new_item_condition_container" className="select_container">
            <label htmlFor="new_item_condition">Condition</label>
            <select
              name="condition"
              id="new_item_condition"
              required
              onChange={this.handleChange}
            >
              {conditionOptions}
            </select>
          </div>

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
