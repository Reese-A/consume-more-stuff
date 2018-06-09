import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadItem } from '../../redux/actions/item-actions';
import { Link } from 'react-router-dom';
import { loadState } from '../../localStorage';

import './ItemDetail.css';

const moment = require('moment');

class ItemDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadItem(id);
  }

  render() {
    const user = loadState().user;
    const category = this.props.item.category
      ? this.props.item.category.name
      : null;
    const condition = this.props.item.condition
      ? this.props.item.condition.name
      : null;
    const owner = this.props.item.owner ? this.props.item.owner.id : null;
    return (
      <div id="item_detail">
        <div id="item_main">
          <div id="item_description">{this.props.item.description}</div>
          {this.props.item.price ? (
            <div className="item_price">{this.props.item.price}</div>
          ) : (
            <div className="item_price">free</div>
          )}
          <img id="item_img" src={this.props.item.img_url} alt="" />
          <div id="item_footer">
            <div id="item_created_at">
              Posted {moment(this.props.item.created_at).fromNow()} in{' '}
              <Link to={`/category/${category}`}>{category}</Link>
            </div>
            <div id="item_updated_at">
              Updated {moment(this.props.item.updated_at).fromNow()}
            </div>
            {user.id === Number(owner) ? (
              <Link id="edit_button" to={`${this.props.match.params.id}/edit`}>
                {' '}
                Edit Item{' '}
              </Link>
            ) : null}
          </div>
        </div>
        <div id="details_wrap">
          <ul id="details_box">
            <div id="details_header">Item Details</div>
            <li id="item_condition">Condition: {condition}</li>
            {this.props.item.make ? (
              <li id="item_make">Make: {this.props.item.make}</li>
            ) : null}
            {this.props.item.model ? (
              <li id="item_model">Model: {this.props.item.model}</li>
            ) : null}
            {this.props.item.dimensions ? (
              <li id="item_dimensions">
                Dimensions: {this.props.item.dimensions}
              </li>
            ) : null}
          </ul>
          {this.props.item.notes ? (
            <div id="item_notes">{this.props.item.notes}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadItem: id => {
      dispatch(loadItem(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);
