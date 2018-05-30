import { LOAD_STATUSES } from '../actions/status-actions';

const initialState = [];

const status = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STATUSES:
      return action.statuses;
    default:
      return state;
  }
};

export default status;
