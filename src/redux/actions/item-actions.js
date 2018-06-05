export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOAD_ITEM = 'LOAD_ITEM';
export const ADD_NEW_ITEM = 'ADD_NEW_ITEM';

export const loadItems = () => {
  return dispatch => {
    return fetch('/item', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(items => {
        return dispatch({ type: LOAD_ITEMS, items });
      });
  };
};

export const loadItem = id => {
  return dispatch => {
    return fetch(`/item/${id}`, {
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
    return fetch(`/item`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(item => {
        console.log(item);
        return dispatch({ type: ADD_NEW_ITEM, item });
      });
  };
};
