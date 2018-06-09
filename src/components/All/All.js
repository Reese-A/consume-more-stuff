import React from 'react';
import { connect } from 'react-redux';

import { loadItems } from '../../redux/actions/item-actions';

import Card from '../Card/Card';

import './All.css';

class All extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  handleNext() {
    const params = new URL(document.location).searchParams;
    let page = params.get('page');
    if (!page) {
      page = 1;
    }
    page = Number(page) + 1;
    this.props.history.push(`/all?page=${page}`);
    window.scroll(0, 0);
  }

  handlePrev() {
    const params = new URL(document.location).searchParams;
    let page = params.get('page');
    page = Number(page) - 1;
    this.props.history.push(`/all?page=${page}`);
    window.scroll(0, 0);
  }
  componentDidUpdate(prevProps, prevState) {
    const params = new URL(document.location).searchParams;
    let page = params.get('page');
    if (prevProps.items === this.props.items) {
      this.props.loadItems(page, 10);
    }
  }

  componentDidMount() {
    const params = new URL(document.location).searchParams;
    let page = params.get('page');
    if (!page) page = 1;
    this.props.loadItems(page, 10);
  }

  render() {
    let items = [];
    if (Array.isArray(this.props.items)) items = this.props.items;

    return (
      <div id="all_items">
        <span className="all_title">All Items</span>
        <div className="all_items_container">
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
        <div id="all_page_buttons">
          <div id="all_prev_page" onClick={this.handlePrev}>
            Previous Page
          </div>
          <div id="all_next_page" onClick={this.handleNext}>
            Next Page
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadItems: (page, limit) => {
      dispatch(loadItems(page, limit));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(All);
