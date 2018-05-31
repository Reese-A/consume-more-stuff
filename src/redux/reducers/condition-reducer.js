import { LOAD_CONDITIONS } from '../actions/condition-actions';

const initialState = [];

const condition = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONDITIONS:
      return action.conditions;
    default:
      return state;
  }
};

export default condition;
