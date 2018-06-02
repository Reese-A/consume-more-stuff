import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadCategoryItems } from '../../redux/actions/category-actions';

import Row from '../Row/Row';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadCategoryItems(5);
  }
  render() {
    return (
      <div id="home">
        {this.props.categories.map(category => {
          return (
            <Row
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCategoryItems: limit => {
      dispatch(loadCategoryItems(limit));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
