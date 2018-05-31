import React from 'react';
import { connect } from 'react-redux';

import Row from '../Row/Row';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="home_content">
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

export default connect(mapStateToProps, null)(Home);
