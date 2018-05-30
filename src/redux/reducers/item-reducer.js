import { LOAD_ITEMS } from '../actions/item-actions';

const initialState = [];

const item = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS:
      return action.items;
    default:
      return state;
  }
};

export default item;
