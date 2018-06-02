import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Card from '../Card/Card';

import './Row.css';

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items[this.props.categoryId] || [];
    return (
      <div className="row">
        <div className="row_title">{this.props.categoryName}</div>
        <div className="row_container">
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

export default connect(mapStateToProps, null)(Row);
