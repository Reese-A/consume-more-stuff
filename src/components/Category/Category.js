import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import {
  loadAllCategoryItems,
  loadCategoryItems
} from '../../redux/actions/category-actions';

import Card from '../Card/Card';

import './Category.css';

const LIMIT = 25;

class Category extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { name } = this.props.match.params;
    this.props.loadCategoryItems(name, 1, LIMIT);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { name } = this.props.match.params;

    if (prevProps.items === this.props.items) {
      this.props.loadCategoryItems(name, 1, LIMIT);
    }
  }

  render() {
    const { name } = this.props.match.params;
    const category = this.props.categories.find(category => {
      return category.name === name;
    });

    if (!category) return <Redirect to="/" />;

    let items = [];
    const id = category ? category.id : undefined;

    if (!Array.isArray(this.props.items)) items = this.props.items[id] || [];

    return (
      <div id="category">
        <span className="category_title">{this.props.match.params.name}</span>
        <div className="category_container">
          {items.map(item => {
            return (
              <Card
                key={item.id}
                id={item.id}
                description={item.description}
                price={item.price}
                img_url={'http://via.placeholder.com/250x200'}
                created_at={item.created_at}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllCategoryItems: limit => {
      dispatch(loadAllCategoryItems(limit));
    },
    loadCategoryItems: (name, page, limit) => {
      dispatch(loadCategoryItems(name, page, limit));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
