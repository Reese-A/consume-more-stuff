export const LOAD_STATUSES = 'LOAD_STATUSES';

export const loadStatuses = () => {
  return dispatch => {
    return fetch('/status')
      .then(res => res.json())
      .then(statuses => {
        return dispatch({
          type: LOAD_STATUSES,
          statuses
        });
      });
  };
};
