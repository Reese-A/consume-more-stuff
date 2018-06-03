export const LOAD_USERS = 'LOAD_USERS';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loadUsers = () => {
  return dispatch => {
    return fetch('/user')
      .then(res => res.json())
      .then(users => {
        return dispatch({
          type: LOAD_USERS,
          users
        });
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
      }
    })
      .then(res => res.json())
      .then(user => {
        return dispatch({
          type: REGISTER_USER,
          user
        });
      });
  };
};

export const loginUser = data => {
  return dispatch => {
    console.log('LOGIN ACTION BEFORE FETCH');
    return fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(user => {
        return dispatch({
          type: LOGIN_USER,
          user
        });
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    return fetch('/user/logout')
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: LOGOUT_USER,
          user: {}
        });
      });
  };
};
