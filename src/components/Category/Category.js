import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import {
  loadAllCategoryItems,
  loadCategoryItems
} from '../../redux/actions/category-actions';

import Card from '../Card/Card';
// import qs from 'query-string';

import './Category.css';

const LIMIT = 10;

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }
  handleNext() {
    const { name } = this.props.match.params;
    const params = new URL(document.location).searchParams;

    let page = params.get('page');
    if (!page) page = 1;

    Number(page) + 1;
    this.props.history.push(`/category/${name}?page=${page}`);
    window.scroll(0, 0);
  }
  handlePrev() {
    const { name } = this.props.match.params;
    const params = new URL(document.location).searchParams;

    let page = params.get('page');
    page = Number(page) - 1;

    this.props.history.push(`/category/${name}?page=${page}`);
    window.scroll(0, 0);
  }
  componentDidMount() {
    const { name } = this.props.match.params;
    const params = new URL(document.location).searchParams;

    let page = params.get('page');
    if (!page) page = 1;
    this.props.loadCategoryItems(name, page, LIMIT);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { name } = this.props.match.params;
    const params = new URL(document.location).searchParams;

    const page = params.get('page');

    if (prevProps.items === this.props.items) {
      this.props.loadCategoryItems(name, page, LIMIT);
    }
  }

  render() {
    const { name } = this.props.match.params;
    const category = this.props.categories.find(category => {
      return category.name === name;
    });

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
                img_url={item.img_url}
                created_at={item.created_at}
              />
            );
          })}
        </div>
        <div id="cat_page_buttons">
          <div id="cat_prev_page" onClick={this.handlePrev}>
            Previous Page
          </div>
          <div id="cat_next_page" onClick={this.handleNext}>
            Next Page
          </div>
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
