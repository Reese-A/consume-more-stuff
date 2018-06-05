import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { loadItems } from '../../redux/actions/item-actions';
import moment from 'moment';
import Card from '../Card/Card';

import './All.css';

class All extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.loadItems(1, 25);
  }

  render() {
    return (
      <div id="all_items">
        <span className="all_title">All Items</span>
        <div className="all_items_container">
          {Object.values(this.props.items).map(item => {
            return (
              <Card
                key={item.id}
                id={item.id}
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

const mapDispatchToProps = dispatch => {
  return {
    loadItems: (page, limit) => {
      dispatch(loadItems(page, limit));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(All);
