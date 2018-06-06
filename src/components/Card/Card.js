import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Card.css';

const moment = require('moment');
class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <Link className="image_link" to={`/item/${this.props.id}`}>
          <img className="card_image" src={this.props.img_url} />
        </Link>
        <div className="card_price">
          {this.props.price ? `$${this.props.price}` : `free`}
        </div>
        <div className="card_description">
          <Link to={`/item/${this.props.id}`}>{this.props.description}</Link>
        </div>
        <div className="card_created_at">
          {moment(this.props.created_at).format('MMM Do')}
        </div>
      </div>
    );
  }
}

export default Card;
