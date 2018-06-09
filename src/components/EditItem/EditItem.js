import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadItem, editItem } from '../../redux/actions/item-actions';

import './EditItem.css';

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.clearPreview = this.clearPreview.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadItem(id);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.condition && state.category) return state;
    const stateChanges = { ...props.item };

    stateChanges.condition_id = props.item.condition_id;
    stateChanges.category_id = props.item.category_id;

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

    if (dimensions) {
      const dimensions_value = dimensions[0];
      const dimensions_units = dimensions[1];
      stateChanges.dimensions_value = dimensions_value;
      stateChanges.dimensions_units = dimensions_units;
    }

    return stateChanges;
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.match.params.id;

    const {
      description,
      price_value,
      price_currency,
      make,
      model,
      dimensions_value,
      dimensions_units,
      notes,
      img_file,
      img_url,
      category_id,
      condition_id,
      status_id
    } = this.state;

    const item = {
      description,
      make,
      model,
      notes,
      img_file,
      img_url,
      category_id,
      condition_id,
      status_id
    };
    if (dimensions_value && dimensions_units) {
      item.dimensions = `${dimensions_value} ${dimensions_units}`;
    }
    if (price_value && price_currency) {
      item.price =
        `${Number(price_value)} ${price_currency}`.trim() || undefined;
    }
    const data = new FormData();
    Object.entries(item).forEach(item => {
      if (item[1]) {
        data.append(item[0], item[1]);
      }
    });
    this.props.editItem(id, data);
    this.props.history.push(`/item/${id}`);
  }

  handleChange(event) {
    let { name, value, files } = event.target;

    if (name === 'category_id') {
      value = Number(value);
    }
    if (name === 'condition_id') {
      value = Number(value);
    }
    if (name === 'status_id') {
      value = Number(value);
    }
    if (name === 'img_file') value = files;

    this.setState({ [name]: value });
  }

  // clearPreview(event) {
  //   event.preventDefault();
  //   const preview = document.getElementById('preview_img_container');
  //   preview.innerHTML = '';
  //   this.img_input.value = '';
  // }

  handleFiles(event) {
    let { files } = event.target;

    const preview = document.getElementById('preview_img_container');
    preview.innerHTML = '';

    if (!files.length) return;

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
            {/* <button
              id="edit_item_img_preview_clear"
              onClick={this.clearPreview}
            >
              Clear
            </button> */}
            <div id="preview_img_container">
              <img src={this.state.img_url} alt="" />
            </div>
          </div>
          <input
            type="file"
            name="img_file"
            id="edit_item_img_file"
            placeholder="Image File"
            ref={input => (this.img_input = input)}
            // multiple
            accept="image/* "
            onChange={this.handleFiles}
          />

          <div id="edit_item_category_container" className="select_container">
            <label htmlFor="edit_item_category">Category</label>
            <select
              name="category_id"
              id="edit_item_category"
              value={this.state.category_id}
              onChange={this.handleChange}
            >
              {categoryOptions}
            </select>
          </div>
          <div id="edit_item_condition_container" className="select_container">
            <label htmlFor="edit_item_condition">Condition</label>
            <select
              name="condition_id"
              id="edit_item_condition"
              value={this.state.condition_id}
              onChange={this.handleChange}
            >
              {conditionOptions}
            </select>
          </div>
          <div id="edit_item_status_container" className="select_container">
            <label htmlFor="edit_item_status">Status</label>
            <select
              name="status_id"
              id="edit_item_status"
              value={this.state.status_id}
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
    // user: state.user,
    categories: state.category,
    conditions: state.condition,
    statuses: state.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadItem: id => {
      dispatch(loadItem(id));
    },
    editItem: (id, data) => {
      dispatch(editItem(id, data));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditItem)
);
