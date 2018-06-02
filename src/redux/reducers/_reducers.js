import { combineReducers } from 'redux';
import category from './category-reducer';
import condition from './condition-reducer';
import { items } from './item-reducer';
import status from './status-reducer';
import user from './user-reducer';

export default combineReducers({
  category,
  condition,
  items,
  status,
  user
});
