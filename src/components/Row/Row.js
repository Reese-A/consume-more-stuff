import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../Card/Card';

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items[this.props.categoryId] || [];
    return (
      <div>
        <div className="row_title">{this.props.categoryName}</div>
        {items.map(item => {
          return (
            <Card
              key={item.id}
              description={item.description}
              price={item.price}
              img_url={item.img_url}
              created_at={item.created_at}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
    items: state.item
  };
};

export default connect(mapStateToProps, null)(Row);
