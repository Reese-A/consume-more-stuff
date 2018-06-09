import React from 'react';
import { connect } from 'react-redux';

import { addNewItem } from '../../redux/actions/item-actions';

import './NewItem.css';

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: undefined,
      category: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.condition && state.category) return state;
    const stateChanges = {};

    if (props.conditions.length > 0) {
      stateChanges.condition = props.conditions[0].id;
    }
    if (props.categories.length > 0) {
      stateChanges.category = props.categories[0].id;
    }
    return stateChanges;
  }

  handleSubmit(event) {
    event.preventDefault();
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
      category,
      condition
    } = this.state;

    const item = {
      description,
      make,
      model,
      notes,
      img_file,
      category_id: category,
      condition_id: condition
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
    this.props.addNewItem(data);
  }

  componentDidUpdate() {
    const item = this.props.item ? this.props.item : {};
    if (item.id) {
      this.props.history.push('/');
    }
  }

  handleChange(event) {
    let { name, value, files } = event.target;

    name = name.trim().toLowerCase();
    value = value.trim().toLowerCase();

    if (name === 'category') value = Number(value);
    if (name === 'condition') value = Number(value);
    if (name === 'img_file') value = files;

    this.setState({ [name]: value });
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
    return (
      <div id="new_item">
        <span id="new_item_title">Add An Item</span>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
            pattern="([A-Za-z0-9]+ ?)*"
            required
            autoFocus
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
              name="price_currency"
              placeholder="Currency"
              onChange={this.handleChange}
              pattern="([A-Za-z]+ ?)*"
            />
          </div>

          <input
            type="text"
            name="make"
            placeholder="Manufacturer"
            pattern="([A-Za-z0-9]+ ?)*"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
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
          {/* <input
            type="url"
            name="img_url"
            placeholder="Image URL"
            onChange={this.handleChange}
          /> */}

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
    categories: state.category,
    conditions: state.condition,
    item: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewItem: data => {
      dispatch(addNewItem(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewItem);
