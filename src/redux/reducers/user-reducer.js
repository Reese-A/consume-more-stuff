import { LOAD_USERS, LOAD_USER } from '../actions/user-actions';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case LOAD_USER:
      return action.user;
    default:
      return state;
  }
};

export default user;
