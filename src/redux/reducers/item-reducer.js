import { LOAD_ITEMS, LOAD_ITEM, NEW_ITEM } from '../actions/item-actions';
import {
  LOAD_CATEGORY_ITEMS,
  LOAD_ALL_CATEGORY_ITEMS
} from '../actions/category-actions';

import store from '../../index';

export const items = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      const items = action.items.reduce((items, item) => {
        if (!items[item.category_id]) {
          items[item.category_id] = [];
        }
        items[item.category_id].push(item);
        return items;
      }, {});
      return items;
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

      const items = {
        [action.category.id]: action.category.items
      };
      return items;
    }
    case NEW_ITEM: {
      const item = action.item;
      const oldItems = { ...state };
      oldItems[item.category_id].push(item);
      return oldItems;
    }
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
