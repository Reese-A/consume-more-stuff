export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOAD_ITEM = 'LOAD_ITEM';
export const ADD_NEW_ITEM = 'ADD_NEW_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';

export const loadItems = (page, limit) => {
  return dispatch => {
    return fetch(`/api/item?page=${page}&limit=${limit}`, {
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(items => {
        return dispatch({ type: LOAD_ITEMS, items });
      });
  };
};

export const loadItem = id => {
  return dispatch => {
    return fetch(`/api/item/${id}`, {
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(item => {
        return dispatch({
          type: LOAD_ITEM,
          item
        });
      });
  };
};

export const addNewItem = data => {
  return dispatch => {
    return fetch(`/api/item`, {
      method: 'POST',
      body: data,
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(item => {
        return dispatch({ type: ADD_NEW_ITEM, item });
      });
  };
};

export const editItem = (id, data) => {
  return dispatch => {
    return fetch(`/api/item/${id}`, {
      method: 'PUT',
      body: data,
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(item => {
        return dispatch({ type: EDIT_ITEM, item });
      });
  };
};
