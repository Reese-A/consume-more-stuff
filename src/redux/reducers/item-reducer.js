import { LOAD_ITEMS, LOAD_ITEM, ADD_NEW_ITEM } from '../actions/item-actions';
import {
  LOAD_CATEGORY_ITEMS,
  LOAD_ALL_CATEGORY_ITEMS
} from '../actions/category-actions';
import { LOAD_USER_ITEMS } from '../actions/user-actions';
import store from '../../index';

export const items = (state = [], action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      return action.items;
    }
    case LOAD_ITEM: {
      return action.item;
    }
    case LOAD_ALL_CATEGORY_ITEMS: {
      const items = action.categories.reduce((items, category) => {
        items[category.id] = category.items;
        return items;
      }, {});
      return items;
    }
    case LOAD_CATEGORY_ITEMS: {
      if (!action.category) return state;

      const items = { [action.category.id]: action.category.items };
      return items;
    }
    case LOAD_USER_ITEMS: {
      const items = action.user.items.reduce((items, item) => {
        if (!items[item.status_id]) items[item.status_id] = [];
        items[item.status_id].push(item);
        return items;
      }, {});
      return items;
    }
    case ADD_NEW_ITEM: {
      // const item = action.item;
      // const items = { ...state };
      // items[item.category_id].push(item);
      // return items;
      return action.item;
    }
    default:
      return state;
  }
};
// export const item = (state = {}, action) => {
//   switch (action.type) {
//     case LOAD_ITEM:
//       return action.item;
//     default:
//       return state;
//   }
// };
