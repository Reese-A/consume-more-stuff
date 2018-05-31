import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

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
            <Link to="/">Home</Link>
          </li>
          <li>
            <span>Categories</span>
            <ul>
              {this.props.categories.map(category => {
                return <li key={category.id}>{category.name}</li>;
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
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
export default connect(mapStateToProps, null)(Sidebar);
