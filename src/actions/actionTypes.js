export const OPERATIONS = {
  FETCH_NOTES: 'FETCH_NOTES',
  SAVE_NOTE: 'SAVE_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE',
};

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const NOTES = {
  SELECT_DATE: 'SELECT_DATE',
  ...Object.keys(OPERATIONS).reduce((op, name) => {
    op[name] = [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
      acc[type] = `${name}_${type}`;
      return acc;
    }, {});
    return op;
  }, {})
};
