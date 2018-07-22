import axios from 'axios';

const baseUrl = 'http://localhost:8081';

export const callApi = (url, options) => {
  return axios({
    ...options,
    url: baseUrl + '/api' + url,
  });
};

export const fetchNotes = userId => callApi('/notes', {
  method: 'get',
  params: {userId}
});

export const saveNote = (userId, note) => callApi('/notes', {
  method: 'post',
  params: {userId},
  data: {note}
});

export const removeNote = (userId, date) => callApi('/notes', {
  method: 'delete',
  params: {userId, date}
});

export default {callApi, fetchNotes, saveNote, removeNote};