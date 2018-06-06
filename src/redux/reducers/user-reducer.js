import {
  LOAD_USERS,
  LOAD_USER,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/user-actions';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case LOAD_USER:
      return action.user;
    case REGISTER_USER:
      return action.user;
    case LOGIN_USER:
      return action.user;
    case LOGOUT_USER:
      return action.user;
    default:
      return state;
  }
};

export default user;
