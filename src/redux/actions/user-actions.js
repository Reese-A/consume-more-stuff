import { saveState, loadState } from '../../localStorage';

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_ITEMS = 'LOAD_USER_ITEMS';

export const loadUsers = () => {
  return dispatch => {
    return fetch('/api/user', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(users => {
        return dispatch({ type: LOAD_USERS, users });
      });
  };
};

export const loadUser = () => {
  return dispatch => {
    const persistedState = loadState();
    return dispatch({
      type: LOAD_USER,
      user: persistedState ? persistedState.user : {}
    });
  };
};

export const loadUserItems = id => {
  return dispatch => {
    return fetch(`/api/user/${id}/items`, { credentials: 'same-origin' })
      .then(res => res.json())
      .then(user => {
        return dispatch({ type: LOAD_USER_ITEMS, user });
      })
      .catch(err => {
        console.log(err);
        return;
      });
  };
};
