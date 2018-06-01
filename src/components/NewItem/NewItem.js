import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import {
  Form,
  Text,
  TextArea,
  Radio,
  RadioGroup,
  Select,
  Checkbox
} from 'react-form';

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
    const categories = this.props.categories || [];
    const conditions = this.props.conditions || [];

    const categoryOptions = categories.map(category => {
      return {
        label: category.name,
        value: category.id
      };
    });

    const conditionOptions = conditions.map(condition => {
      return {
        label: condition.name,
        value: condition.id
      };
    });
    return (
      <div id="new_item" className="new_item">
        <Form onSubmit={this.handleSubmit}>
          {formApi => {
            console.log(formApi);
            return (
              <form onSubmit={formApi.submitForm} id="new_item_form">
                <label htmlFor="description">Description</label>
                <Text required field="description" id="description" />
                <Select
                  required
                  field="category"
                  id="category"
                  options={categoryOptions}
                  className=""
                />
                <Select
                  required
                  field="condition"
                  id="condition"
                  options={conditionOptions}
                  className=""
                />

                <button type="submit" className="">
                  Submit
                </button>
              </form>
            );
          }}
        </Form>{' '}
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
