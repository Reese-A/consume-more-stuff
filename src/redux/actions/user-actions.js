export const LOAD_USERS = 'LOAD_USERS';

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
