import { all, fork } from 'redux-saga/effects';

import {
  watchFetchNotes,
  watchSaveNote,
  watchRemoveNote
} from './notes';

export default function* root() {
  yield all([
    fork(watchFetchNotes),
    fork(watchSaveNote),
    fork(watchRemoveNote),
  ]);
}
