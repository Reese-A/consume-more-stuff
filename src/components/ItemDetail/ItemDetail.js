import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadItem } from '../../redux/actions/item-actions';
import { Link } from 'react-router-dom';

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
    const owner = this.props.item.owner ? this.props.item.owner.name : null;
    return (
      <div id="item_detail">
        <div>{this.props.item.description}</div>
        <div>{this.props.item.price}</div>
        <img src={this.props.item.img_url} alt="" />
        <ul id="details_box">
          Item Details:
          <li>{condition}</li>
          <li>{this.props.make}</li>
          <li>{this.props.model}</li>
          <li>{this.props.dimensions}</li>
        </ul>
        <div>{this.props.item.notes}</div>
        <div>
          Posted on {this.props.item.created_at} in{' '}
          <Link to={`/category/${category}`}>{category}</Link> by {owner}
        </div>
        <div>Updated at {this.props.item.updated_at}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.item
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
