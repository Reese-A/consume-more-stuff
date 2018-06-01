import { LOAD_ITEMS, LOAD_ITEM, NEW_ITEM } from '../actions/item-actions';

const initialState = [];

export const items = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS:
      const items = action.items.reduce((items, item) => {
        if (!items[item.category_id]) {
          items[item.category_id] = [];
        }
        items[item.category_id].push(item);
        return items;
      }, {});
      return items;
      break;
    case NEW_ITEM:
      const item = action.item;
      const oldItems = { ...state };
      oldItems[item.category_id].push(item);
      return oldItems;
      break;
    default:
      return state;
  }
};
export const item = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ITEM:
      return action.item;
    default:
      return state;
  }
};
