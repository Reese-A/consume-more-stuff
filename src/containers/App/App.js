import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import { loadCategories } from '../../redux/actions/category-actions';

import Home from '../../components/Home/Home';
import Sidebar from '../../components/Sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Home />
      </div>
    );
  }
  componentDidMount() {
    this.props.loadCategories();
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => {
      dispatch(loadCategories());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
