import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <img className="card_image" src={this.props.img_url} />
        <div className="card_price">${this.props.price}</div>
        <div className="card_description">{this.props.description}</div>
        <div className="card_created_at">{this.props.created_at}</div>
      </div>
    );
  }
}

export default Card;
