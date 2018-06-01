import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Card.css';

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
        <div className="card_price">${this.props.price}</div>
        <div className="card_description">
          <Link to={`/item/${this.props.id}`}>{this.props.description}</Link>
        </div>
        <div className="card_created_at">{this.props.created_at}</div>
      </div>
    );
  }
}

export default Card;
