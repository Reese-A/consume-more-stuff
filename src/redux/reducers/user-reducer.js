import { LOAD_USERS } from '../actions/user-actions';

const initialState = [];

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    default:
      return state;
  }
};

export default user;
