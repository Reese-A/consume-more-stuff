export const LOAD_CONDITIONS = 'LOAD_CONDITIONS';

export const loadConditions = () => {
  return dispatch => {
    return fetch('/api/condition', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(conditions => {
        return dispatch({ type: LOAD_CONDITIONS, conditions });
      });
  };
};
