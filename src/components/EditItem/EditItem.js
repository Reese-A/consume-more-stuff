import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { loadItem } from '../../redux/actions/item-actions';

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadItem(id);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.condition && state.category) return state;
    const stateChanges = { ...props.item };

    console.log(props);
    console.log(state);
    // if (props.conditions.length > 0) {
    //   stateChanges.condition = props.conditions[0].id;
    // }
    // if (props.categories.length > 0) {
    //   stateChanges.category = props.categories[0].id;
    // }
    // return state;
    stateChanges.condition = props.item.condition_id;
    stateChanges.category = props.item.category_id;

    const price = props.item.price ? props.item.price.split(' ') : undefined;
    if (price) {
      const price_value = price[0];
      const price_currency = price[1];
      stateChanges.price_value = price_value;
      stateChanges.price_currency = price_currency;
    }

    return stateChanges;
  }

  handleChange(event) {
    let { name, value, files } = event.target;

    name = name.trim().toLowerCase();
    value = value.trim().toLowerCase();

    if (name === 'category') value = Number(value);
    if (name === 'condition') value = Number(value);
    if (name === 'img_file') value = files;

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
        <span id="new_item_title">Edit Item</span>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
            value={this.state.description}
            pattern="([A-Za-z0-9]+ ?)*"
            required
            autoFocus
          />
          <div id="new_item_price_container">
            <input
              type="number"
              name="price_value"
              value={this.state.price_value}
              placeholder="Price"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="price_currency"
              placeholder="Currency"
              value={this.state.price_currency}
              onChange={this.handleChange}
              pattern="([A-Za-z]+ ?)*"
            />
          </div>

          <input
            type="text"
            name="make"
            placeholder="Manufacturer"
            value={this.state.make}
            pattern="([A-Za-z0-9]+ ?)*"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={this.state.model}
            pattern="([A-Za-z0-9]+ ?)*"
            onChange={this.handleChange}
          />

          <div id="new_item_dimensions_container">
            <input
              type="text"
              name="dimensions_value"
              placeholder="Dimensions"
              pattern=" *([0-9]+.?[0-9]*){1,1} *[xX] *([0-9]+.?[0-9]*){1,1} *[xX] *([0-9]+.?[0-9]*){1,1} *"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="dimensions_units"
              placeholder="Units"
              onChange={this.handleChange}
              pattern="([A-Za-z]+ ?)*"
            />
          </div>

          <textarea
            type="text"
            name="notes"
            placeholder="Product Notes"
            onChange={this.handleChange}
          />
          <div id="preview" />
          <input
            type="file"
            name="img_file"
            id="new_item_img_file"
            placeholder="Image File"
            // multiple
            accept="image/* "
            onChange={this.handleFiles}
            required
          />

          <div id="new_item_category_container" className="select_container">
            <label htmlFor="new_item_category">Category</label>
            <select
              name="category"
              id="new_item_category"
              value={this.state.category}
              onChange={this.handleChange}
              required
            >
              {categoryOptions}
            </select>
          </div>
          <div id="new_item_condition_container" className="select_container">
            <label htmlFor="new_item_condition">Condition</label>
            <select
              name="condition"
              id="new_item_condition"
              value={this.state.condition}
              onChange={this.handleChange}
              required={true}
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
    item: state.items,
    user: state.user,
    categories: state.category,
    conditions: state.condition
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadItem: id => {
      dispatch(loadItem(id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditItem)
);
