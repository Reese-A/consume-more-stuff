import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import { loadCategories } from '../../redux/actions/category-actions';
import { loadConditions } from '../../redux/actions/condition-actions';
import { loadStatuses } from '../../redux/actions/status-actions';
import { loadUsers } from '../../redux/actions/user-actions';
import { loadItems } from '../../redux/actions/item-actions';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';

class App extends Component {
  constructor(props) {
    super(props);
  }
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
    this.props.loadConditions();
    this.props.loadStatuses();
    this.props.loadUsers();
    this.props.loadItems();
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
    conditions: state.condition,
    statuses: state.status,
    users: state.users,
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => {
      dispatch(loadCategories());
    },
    loadConditions: () => {
      dispatch(loadConditions());
    },
    loadStatuses: () => {
      dispatch(loadStatuses());
    },
    loadUsers: () => {
      dispatch(loadUsers());
    },
    loadItems: () => {
      dispatch(loadItems());
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
