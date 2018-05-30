import { combineReducers } from 'redux';
import category from './category-reducer';
import condition from './condition-reducer';
import item from './item-reducer';
import status from './status-reducer';
import user from './user-reducer';

export default combineReducers({ category, condition, item, status, user });
