import { LOAD_STATUSES } from '../actions/status-actions';

const status = (state = [], action) => {
  switch (action.type) {
    case LOAD_STATUSES:
      return action.statuses;
    default:
      return state;
  }
};

export default status;
