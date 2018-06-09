import React from 'react';
import { connect } from 'react-redux';

import { Link, NavLink, withRouter } from 'react-router-dom';
import { loadState } from '../../localStorage';

import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const user = loadState().user;
    return (
      <div id="sidebar" className="sidebar">
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <span>Categories</span>
            <ul>
              {this.props.categories.map(category => {
                return (
                  <li key={category.id}>
                    <NavLink exact to={`/category/${category.name}`}>
                      {category.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <NavLink exact to="/all?page=1">
              All
            </NavLink>
          </li>
          {user.id ? (
            <li>
              <NavLink exact to={`/user/${user.id}/home`}>
                My Listings
              </NavLink>
            </li>
          ) : null}
          {user.id ? (
            <li>
              <NavLink exact to="/item/new-item">
                New Item
              </NavLink>
            </li>
          ) : null}
          {user.id ? (
            <li>
              <NavLink exact to={`/user/${user.id}/password`}>
                Change Password
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     loadCategories: () => {
//       dispatch(loadCategories());
//     }
//   };
// };
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Sidebar)
);
