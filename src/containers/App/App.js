import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import { loadCategories } from '../../redux/actions/category-actions';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <Sidebar />
        <Main />
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
