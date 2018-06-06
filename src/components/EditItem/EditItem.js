import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { loadItem } from '../../redux/actions/item-actions';

import './EditItem.css';

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
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
    const dimensions = props.item.dimensions
      ? props.item.dimensions.split(' ')
      : undefined;
    console.log(dimensions);

    if (dimensions) {
      const dimensions_value = dimensions[0];
      const dimensions_units = dimensions[1];
      stateChanges.dimensions_value = dimensions_value;
      stateChanges.dimensions_units = dimensions_units;
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

  handleFiles(event) {
    const { files } = event.target;

    const preview = document.getElementById('preview');
    preview.innerHTML = '';

    const imgElem = document.createElement('img');
    imgElem.file = files[0];
    preview.appendChild(imgElem);

    const reader = new FileReader();
    reader.onload = (imgElem => {
      return event => {
        imgElem.src = event.target.result;
        this.setState({ img_file: files[0] });
      };
    })(imgElem);
    reader.readAsDataURL(files[0]);
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

    const statusOptions = this.props.statuses.map(status => {
      return (
        <option key={status.id} value={status.id}>
          {status.name}
        </option>
      );
    });
    return (
      <div id="edit_item">
        <span id="edit_item_title">Edit Item</span>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
            value={this.state.description}
            pattern="([A-Za-z0-9]+ ?)*"
            autoFocus
          />
          <div id="edit_item_price_container">
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

          <div id="edit_item_dimensions_container">
            <input
              type="text"
              name="dimensions_value"
              placeholder="Dimensions"
              value={this.state.dimensions_value}
              pattern=" *([0-9]+.?[0-9]*){1,1} *[xX] *([0-9]+.?[0-9]*){1,1} *[xX] *([0-9]+.?[0-9]*){1,1} *"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="dimensions_units"
              placeholder="Units"
              value={this.state.dimensions_units}
              onChange={this.handleChange}
              pattern="([A-Za-z]+ ?)*"
            />
          </div>

          <textarea
            type="text"
            name="notes"
            placeholder="Product Notes"
            value={this.state.notes}
            onChange={this.handleChange}
          />
          <div id="preview">
            <img src={this.state.img_url} alt="" />
          </div>
          <input
            type="file"
            name="img_file"
            id="edit_item_img_file"
            placeholder="Image File"
            // multiple
            accept="image/* "
            onChange={this.handleFiles}
          />

          <div id="edit_item_category_container" className="select_container">
            <label htmlFor="edit_item_category">Category</label>
            <select
              name="category"
              id="edit_item_category"
              value={this.state.category}
              onChange={this.handleChange}
            >
              {categoryOptions}
            </select>
          </div>
          <div id="edit_item_condition_container" className="select_container">
            <label htmlFor="edit_item_condition">Condition</label>
            <select
              name="condition"
              id="edit_item_condition"
              value={this.state.condition}
              onChange={this.handleChange}
            >
              {conditionOptions}
            </select>
          </div>
          <div id="edit_item_status_container" className="select_container">
            <label htmlFor="edit_item_status">Status</label>
            <select
              name="status"
              id="edit_item_status"
              value={this.state.status}
              onChange={this.handleChange}
            >
              {statusOptions}
            </select>
          </div>

          <button type="submit">Edit Item</button>
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
    conditions: state.condition,
    statuses: state.status
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditItem)
);
