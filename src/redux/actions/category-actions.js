export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CATEGORY_ITEMS = 'LOAD_CATEGORY_ITEMS';

export const loadCategories = () => {
  return dispatch => {
    return fetch('/category')
      .then(res => res.json())
      .then(categories => {
        return dispatch({
          type: LOAD_CATEGORIES,
          categories
        });
      });
  };
};

export const loadCategoryItems = () => {
  return dispatch => {
    return fetch('/category/items?limit=5')
      .then(res => res.json())
      .then(categories => {
        return dispatch({
          type: LOAD_CATEGORY_ITEMS,
          categories
        });
      });
  };
};
