export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_ALL_CATEGORY_ITEMS = 'LOAD_ALL_CATEGORY_ITEMS';
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

export const loadAllCategoryItems = limit => {
  return dispatch => {
    return fetch(`/category/items?limit=${limit}`)
      .then(res => res.json())
      .then(categories => {
        return dispatch({
          type: LOAD_ALL_CATEGORY_ITEMS,
          categories
        });
      });
  };
};

export const loadCategoryItems = (id, page, limit) => {
  console.log('ACTION');
  console.log(id, page, limit);
  return dispatch => {
    return fetch(`/category/${id}?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(items => {
        console.log('ITEMS', items);
        return dispatch({
          type: LOAD_CATEGORY_ITEMS,
          items
        });
      });
  };
};
