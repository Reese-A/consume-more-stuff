export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_ALL_CATEGORY_ITEMS = 'LOAD_ALL_CATEGORY_ITEMS';
export const LOAD_CATEGORY_ITEMS = 'LOAD_CATEGORY_ITEMS';

export const loadCategories = () => {
  return dispatch => {
    return fetch(`/api/category`, { credentials: 'same-origin' })
      .then(res => {
        return res.json();
      })
      .then(categories => {
        return dispatch({ type: LOAD_CATEGORIES, categories });
      });
  };
};

export const loadAllCategoryItems = limit => {
  return dispatch => {
    return fetch(`/api/category/items?limit=${limit}`, {
      credentials: 'same-origin'
    })
      .then(res => {
        return res.json();
      })
      .then(categories => {
        return dispatch({ type: LOAD_ALL_CATEGORY_ITEMS, categories });
      });
  };
};

export const loadCategoryItems = (name, page, limit) => {
  return dispatch => {
    return fetch(`/api/category/${name}?page=${page}&limit=${limit}`, {
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(category => {
        return dispatch({ type: LOAD_CATEGORY_ITEMS, category });
      });
  };
};
