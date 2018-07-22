import createReducer from './createReducer';
import { NOTES, REQUEST, SUCCESS, FAILURE } from '../actions/actionTypes';
import omit from 'lodash/omit';
import moment from 'moment';
import { formatDate } from '../tools';

const {FETCH_NOTES, SAVE_NOTE, REMOVE_NOTE, SELECT_DATE} = NOTES;


const initialState = {
  selectedDate: formatDate(moment()),
  pending: false,
  error: null,
  list: []
};

const reducer = {
  [SELECT_DATE]: (prevState, {date}) => ({
    ...prevState,
    selectedDate: date
  }),
  [FETCH_NOTES[REQUEST]]: (prevState) => ({
    ...prevState,
    pending: true
  }),
  [FETCH_NOTES[SUCCESS]]: (prevState, {list}) => ({
    ...prevState,
    pending: false,
    error: false,
    list
  }),
  [FETCH_NOTES[FAILURE]]: (prevState, {error}) => ({
    ...prevState,
    pending: false,
    error
  }),
  [SAVE_NOTE[REQUEST]]: (prevState, {note}) => ({
    ...prevState,
    pending: true,
    note,
  }),
  [SAVE_NOTE[SUCCESS]]: (prevState, {note}) => ({
    ...prevState,
    pending: false,
    error: false,
    list: {
      ...prevState.list,
      [note.date]: note
    }
  }),
  [SAVE_NOTE[FAILURE]]: (prevState, {error}) => ({
    ...prevState,
    pending: false,
    error
  }),
  [REMOVE_NOTE[REQUEST]]: (prevState, {noteDate}) => ({
    ...prevState,
    pending: true,
    noteDate
  }),
  [REMOVE_NOTE[SUCCESS]]: (prevState, {noteDate}) => ({
    ...prevState,
    list: omit(prevState.list, noteDate),
    pending: false,
  }),
  [REMOVE_NOTE[FAILURE]]: (prevState, {error}) => ({
    ...prevState,
    pending: false,
    error
  }),
};

export default createReducer(initialState, reducer);