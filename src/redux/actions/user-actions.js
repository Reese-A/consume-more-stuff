import { loadState } from '../../localStorage';

export const LOAD_USERS = 'LOAD_USERS';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_ITEMS = 'LOAD_USER_ITEMS';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const loadUsers = () => {
  return dispatch => {
    return fetch('/user', { credentials: 'same-origin' })
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

export const registerUser = data => {
  return dispatch => {
    return fetch('/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(user => {
        return dispatch({ type: REGISTER_USER, user });
      });
  };
};

export const loginUser = data => {
  return dispatch => {
    return fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(user => {
        return dispatch({ type: LOGIN_USER, user });
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    return fetch('/user/logout', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(res => {
        return dispatch({ type: LOGOUT_USER, user: {} });
      });
  };
};

export const loadUserItems = id => {
  return dispatch => {
    return fetch(`/user/${id}/items`, { credentials: 'same-origin' })
      .then(res => res.json())
      .then(user => {
        return dispatch({ type: LOAD_USER_ITEMS, user });
      });
  };
};

export const updatePassword = data => {
  return dispatch => {
    return fetch(`/user/${data.id}/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(user => {
        return dispatch({ type: UPDATE_PASSWORD, user });
      });
  };
};
