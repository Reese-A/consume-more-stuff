import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          return <div key={item.id}>{item.description}</div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    categories: state.category,
    items: state.item
  };
};

export default connect(mapStateToProps, null)(Row);
