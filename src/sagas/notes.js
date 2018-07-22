/* eslint-disable no-constant-condition */
import { put, call, takeLatest, select } from 'redux-saga/effects';
import api from '../services/api';
import { NOTES, REQUEST } from '../actions/actionTypes';
import * as actions from '../actions';
import { selectNote, selectSelectedDate } from '../reducers/selectors';

const DEFAULT_USER_ID = '455220d6-90f7-470f-b4b5-f216b150834e';

/***************************** Subroutines ************************************/

function* fetchEntity(entity, apiFn, ...params) {
  const {data, error} = yield call(apiFn, ...params);
  if (data)
    yield put(entity.success(data));
  else
    yield put(entity.failure(error));
}

export const fetchNotes = fetchEntity.bind(null, actions.fetchNotes, api.fetchNotes, DEFAULT_USER_ID);
export const saveNote = fetchEntity.bind(null, actions.saveNote, api.saveNote, DEFAULT_USER_ID);
export const removeNote = fetchEntity.bind(null, actions.removeNote, api.removeNote, DEFAULT_USER_ID);

export function* fetchNotesSaga() {
  yield call(fetchNotes);
}

export function* saveNoteSaga() {
  const note = yield select(selectNote);
  yield call(saveNote, note);
}

export function* removeNoteSaga() {
  const selectedDate = yield select(selectSelectedDate);
  yield call(removeNote, selectedDate);
}

/******************************* WATCHERS *************************************/

export function* watchFetchNotes() {
  yield takeLatest(NOTES.FETCH_NOTES[REQUEST], fetchNotesSaga);
}

export function* watchSaveNote() {
  yield takeLatest(NOTES.SAVE_NOTE[REQUEST], saveNoteSaga);
}

export function* watchRemoveNote() {
  yield takeLatest(NOTES.REMOVE_NOTE[REQUEST], removeNoteSaga);
}
