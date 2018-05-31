import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Card from '../Card/Card';

import './All.css';

class All extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const items = Object.values(this.props.items).reduce((items, itemArr) => {
      return [...items, ...itemArr];
    }, []);

    return (
      <div id="all_items">
        <span className="all_title">{this.props.match.params.name}</span>
        <div className="all_items_container">
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
