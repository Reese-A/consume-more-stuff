import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadItem } from '../../redux/actions/item-actions';
import { Link } from 'react-router-dom';
import { loadState } from '../../localStorage';

import './ItemDetail.css';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const persistedState = loadState();
    this.setState({
      user: persistedState.user
    });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadItem(id);
    console.log('MOUNT', this.props.item);
  }

  render() {
    const category = this.props.item.category
      ? this.props.item.category.name
      : null;
    const condition = this.props.item.condition
      ? this.props.item.condition.name
      : null;
    const owner = this.props.item.owner ? this.props.item.owner.id : null;
    console.log('ITEMDETAIL', this.props.item);
    return (
      <div id="item_detail">
        <div id="item_main">
          <span id="item_description">{this.props.item.description}</span>
          <span id="item_price">{this.props.item.price}</span>
          <img id="item_img" src={this.props.item.img_url} alt="" />
          <div id="item_footer">
            <div id="item_created_at">
              Posted on {this.props.item.created_at} in{' '}
              <Link to={`/category/${category}`}>{category}</Link>
            </div>
            <div id="item_updated_at">
              Updated at {this.props.item.updated_at}
            </div>
            {this.state.user.id === Number(owner) ? (
              <Link id="edit_button" to={`${this.props.match.params.id}/edit`}>
                {' '}
                Edit Item{' '}
              </Link>
            ) : null}
          </div>
        </div>
        <div id="details_wrap">
          <ul id="details_box">
            <div id="details_header">Item Details</div>
            <li id="item_condition">Condition: {condition}</li>
            {this.props.item.make ? (
              <li id="item_make">Make: {this.props.item.make}</li>
            ) : null}
            {this.props.item.model ? (
              <li id="item_model">Model: {this.props.item.model}</li>
            ) : null}
            {this.props.item.dimensions ? (
              <li id="item_dimensions">
                Dimensions: {this.props.item.dimensions}
              </li>
            ) : null}
          </ul>
          <div id="item_notes">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
            nihil fuga error necessitatibus deserunt distinctio quod, explicabo
            unde voluptatem nam incidunt qui consectetur ipsa veritatis eligendi
            ipsum placeat id? Distinctio! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat enim eum asperiores praesentium velit
            eaque architecto consequuntur tempora, voluptatem perspiciatis
            fugiat quo soluta ex eos, impedit numquam inventore cumque quasi.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            doloribus facere quas ipsam, rem fugit iusto, laborum totam debitis
            quam temporibus non minima amet eos unde quia vitae! Ducimus,
            voluptas! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Ratione ex repudiandae dicta quam quasi nesciunt accusamus neque
            ducimus quaerat at voluptates veritatis assumenda, dignissimos
            corporis, alias nemo, cumque quia placeat. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Nemo, repellat. Ab quis dolores
            dolore veniam ea repudiandae hic atque cum dolor corporis eaque
            mollitia neque nisi vitae, necessitatibus labore illum.{' '}
            {this.props.item.notes}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadItem: id => {
      dispatch(loadItem(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);
