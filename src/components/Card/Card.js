import React, { Component } from 'react';
import { connect } from 'react-redux';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="card">
        <div className="card_price">{this.props.price}</div>
        <img src={this.props.img_url} />
        <div className="card_description">{this.props.description}</div>
        <div className="card_created_at">{this.props.created_at}</div>
      </div>
    );
  }
}

export default Card;
