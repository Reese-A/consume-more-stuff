import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadItem } from '../../redux/actions/item-actions';
import { Link } from 'react-router-dom';

import './ItemDetail.css';
class ItemDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadItem(id);
    console.log('MOUNT', this.props.item);
  }

  render() {
    const category = this.props.item.category
      ? this.props.item.category.name
      : null;
    const condition = this.props.item.condition
      ? this.props.item.condition.name
      : null;
    console.log('ITEMDETAIL', this.props.item);
    return (
      <div id="item_detail">
        <div id="item_main">
          <span id="item_description">{this.props.item.description}</span>
          <span id="item_price">{this.props.item.price}</span>
          <img id="item_img" src={this.props.item.img_url} alt="" />
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
          <div id="item_notes">{this.props.item.notes}</div>
        </div>
        <div id="item_footer">
          <div id="item_created_at">
            Posted on {this.props.item.created_at} in{' '}
            <Link to={`/category/${category}`}>{category}</Link>
          </div>
          <div id="item_updated_at">
            Updated at {this.props.item.updated_at}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
