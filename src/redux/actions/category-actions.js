export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

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
