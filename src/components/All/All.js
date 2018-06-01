import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
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

    items.sort((a, b) => {
      return moment(b.created_at).diff(moment(a.created_at));
    });

    console.log(items);

    return (
      <div id="all_items">
        <span className="all_title">All Items</span>
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
    items: state.items
  };
};

export default connect(mapStateToProps, null)(All);
