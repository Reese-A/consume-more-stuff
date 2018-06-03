import {
  LOAD_USERS,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/user-actions';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case REGISTER_USER:
      console.log(action);
      return action.user;
    case LOGIN_USER:
      console.log('LOGIN REDUCER');
      return action.user;
    default:
      return state;
  }
};

export default user;
