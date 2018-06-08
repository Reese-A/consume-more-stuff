import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { loadItems } from '../../redux/actions/item-actions';
import moment from 'moment';
import Card from '../Card/Card';
import qs from 'query-string';

import './All.css';

class All extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  handleNext() {
    const parse = qs.parse(this.props.location.search);
    let { page } = parse;
    if (!page) {
      page = 1;
    }
    page = Number(page) + 1;
    this.props.history.push(`/all?page=${page}`);
    window.scroll(0, 0);
  }

  handlePrev() {
    const parse = qs.parse(this.props.location.search);
    let { page } = parse;
    page = Number(page) - 1;
    this.props.history.push(`/all?page=${page}`);
    window.scroll(0, 0);
  }
  componentDidUpdate(prevProps, prevState) {
    const parse = qs.parse(this.props.location.search);
    const { page } = parse;
    if (prevProps.items === this.props.items) {
      this.props.loadItems(page, 10);
    }
  }

  componentDidMount() {
    const parse = qs.parse(this.props.location.search);
    const { page } = parse;
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
