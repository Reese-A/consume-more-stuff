import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Card from '../Card/Card';

import './Category.css';

class All extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name } = this.props.match.params;
    const category = this.props.categories.find(category => {
      return category.name === name;
    });
    const id = category ? category.id : undefined;

    let items = this.props.items[id] || [];

    return (
      <div id="category">
        <span className="category_title">{this.props.match.params.name}</span>
        <div className="category_container">
          {items.map(item => {
            return (
              <Card
                key={item.id}
                description={item.description}
                price={item.price}
                img_url={'http://via.placeholder.com/250x200'}
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
    items: state.item
  };
};

export default connect(mapStateToProps, null)(All);
