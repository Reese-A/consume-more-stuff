import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { loadAllCategoryItems } from '../../redux/actions/category-actions';

import Card from '../Card/Card';

import './Category.css';

class Category extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('componentDidMount');

    this.props.loadAllCategoryItems();
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');

    return state;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');

    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);

    if (prevProps.items === this.props.items) {
      this.props.loadAllCategoryItems(Math.floor(Math.random() * 5));
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('update');
  //   console.log(nextProps);
  //   next.Props;
  //   // this.props.loadAllCategoryItems(3);
  //   return true;
  // }
  render() {
    const { name } = this.props.match.params;
    const category = this.props.categories.find(category => {
      return category.name === name;
    });

    if (!category) return <Redirect to="/" />;

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
    categories: state.category,
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllCategoryItems: limit => {
      dispatch(loadAllCategoryItems(limit));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
