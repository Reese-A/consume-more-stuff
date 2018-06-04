import React from 'react';
import { connect } from 'react-redux';

import { Link, NavLink, withRouter } from 'react-router-dom';

import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
            <NavLink exact to="/all">
              All
            </NavLink>
          </li>
          {this.props.user.id ? (
            <li>
              <NavLink exact to="/item/new-item">
                New Item
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
    categories: state.category,
    user: state.user
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     loadCategories: () => {
//       dispatch(loadCategories());
//     }
//   };
// };
export default withRouter(connect(mapStateToProps, null)(Sidebar));
