import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import { loadCategories } from '../../redux/actions/category-actions';
import { loadConditions } from '../../redux/actions/condition-actions';
import { loadStatuses } from '../../redux/actions/status-actions';
import { loadUsers, loadUser } from '../../redux/actions/user-actions';
import { loadItems } from '../../redux/actions/item-actions';
import { saveState } from '../../localStorage';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="app">
        <Switch>
          <Route
            exact
            path="/login"
            render={() => (
              <div id="app_login" className="app_container">
                <Header />
                <Login />
              </div>
            )}
          />
          <Route
            exact
            path="/register"
            render={() => (
              <div id="app_register" className="app_container">
                <Header />
                <Register />
              </div>
            )}
          />
          <Route
            render={() => (
              <div id="app_main" className="app_container">
                <Header />
                <Sidebar />
                <Main />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
  componentDidMount() {
    this.props.loadCategories();
    this.props.loadConditions();
    this.props.loadStatuses();
    this.props.loadUser();
    if (!localStorage.getItem('state')) {
      saveState({ user: {} });
    }
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
    conditions: state.condition,
    statuses: state.status,
    users: state.user,
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
    // loadUsers: () => {
    //   dispatch(loadUsers());
    // },
    loadUser: () => {
      dispatch(loadUser());
    },
    loadItems: () => {
      dispatch(loadItems());
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
