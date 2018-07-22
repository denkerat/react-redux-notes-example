/**
 * createReducer
 *
 * @param {object} _initialState
 * @param {object} _reducer
 *
 * Example _initialState:
 * const initState = {
 *  a: 2,
 *  b: 3,
 *  c: 4,
 *  d: 5
 * }
 *
 * Example _reducer:
 * const reducerObj = {
 *  [ADD_TO_A]: (prevState, payload) => ({ a: prevState.a + payload }),
 *  [POWER_OF_B]: (prevState) => ({ b: prevState.b * prevState.b }),
 *  [C_IS_TWELVE]: { c: 12 }
 * }
 */
export default function createReducer(_initialState, _reducer) {
  return function reducer(state = _initialState, action) {
    if (_reducer.hasOwnProperty(action.type)) {
      return _reducer[action.type](state, action);
    } else {
      return state;
    }
  };
}