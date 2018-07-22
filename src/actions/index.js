import { NOTES, REQUEST, SUCCESS, FAILURE } from '../actions/actionTypes';


function action(type, payload = {}) {
  return {type, ...payload};
}

export const selectDate = date => action(NOTES.SELECT_DATE, {date});

export const fetchNotes = {
  request: () => action(NOTES.FETCH_NOTES[REQUEST]),
  success: list => action(NOTES.FETCH_NOTES[SUCCESS], {list}),
  failure: error => action(NOTES.FETCH_NOTES[FAILURE], {error})
};

export const saveNote = {
  request: note => action(NOTES.SAVE_NOTE[REQUEST], {note}),
  success: response => action(NOTES.SAVE_NOTE[SUCCESS], {note: response}),
  failure: error => action(NOTES.SAVE_NOTE[FAILURE], {error})
};

export const removeNote = {
  request: noteDate => action(NOTES.REMOVE_NOTE[REQUEST], {noteDate}),
  success: response => action(NOTES.REMOVE_NOTE[SUCCESS], {noteDate: response}),
  failure: error => action(NOTES.REMOVE_NOTE[FAILURE], {error})
};
