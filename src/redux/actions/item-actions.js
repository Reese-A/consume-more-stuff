export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOAD_ITEM = 'LOAD_ITEM';
export const NEW_ITEM = 'NEW_ITEM';

export const loadItems = () => {
  return dispatch => {
    return fetch('/item')
      .then(res => res.json())
      .then(items => {
        return dispatch({
          type: LOAD_ITEMS,
          items
        });
      });
  };
};

export const loadItem = id => {
  return dispatch => {
    return fetch(`/item/${id}`)
      .then(res => res.json())
      .then(item => {
        return dispatch({
          type: LOAD_ITEM,
          item
        });
      });
  };
};

export const newItem = data => {
  return dispatch => {
    return fetch(`/item`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(item => {
        return dispatch({
          type: NEW_ITEM,
          item
        });
      });
  };
};
