import { LOAD_CATEGORIES } from '../actions/category-actions';

const initialState = [];

const category = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default category;
