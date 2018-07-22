const util = require('util');
const fs = require('fs');
const v4 = require('uuid/v4');
const logger = require('./logger');
const {find, findIndex} = require('lodash');
const initData = require('./init-data.json');

const fs_writeFile = util.promisify(fs.writeFile);

const errors = {
  userNotFound: {
    id: 'USER_NOT_FOUND',
    message: userId => `User ${userId} not found`
  }
};

const DATABASE_FILE_NAME = 'data.json';

let DB = readDB();

function readDB() {
  if (fs.existsSync(DATABASE_FILE_NAME)) {
    return JSON.parse(fs.readFileSync(DATABASE_FILE_NAME, 'utf8'));
  } else {
    let DB = initData;
    saveDB(DB);
    return initData;
  }
}

function saveDB(data) {
  return fs_writeFile(DATABASE_FILE_NAME, JSON.stringify(data));
}

const getUser = userId => new Promise((resolve, reject) => {
  const user = find(DB, {id: userId});
  if (!user) {
    const {id, message} = errors.userNotFound;
    logger.error(message(userId));
    reject({id, err: message(userId)});
  }
  resolve(user);
});

const getUserIndex = userId => new Promise((resolve, reject) => {
  let userIndex = findIndex(DB, ({id}) => id === userId);
  let user = DB[userIndex];
  if (!user) {
    const {id, message} = errors.userNotFound;
    logger.error(message(userId));
    reject({id, err: message(userId)});
  }
  resolve(userIndex);
});

const getAllUserNotes = userId => getUser(userId).then(({notes}) => notes);

const addUser = (username) => {
  DB.push({
    id: v4(),
    username,
    notes: {}
  });
  saveDB(DB);
};

const saveUserNote = (userId, {date, ...note}) => new Promise((resolve) =>
  getUserIndex(userId).then(userIndex => {
    const newNote = {...note, date};
    DB[userIndex].notes[date] = newNote;
    saveDB(DB);
    resolve(newNote);
  }));

const removeUserNote = (userId, date) => new Promise((resolve) =>
  getUserIndex(userId).then(userIndex => {
    delete DB[userIndex].notes[date];
    saveDB(DB);
    resolve();
  }));

module.exports = {
  getUser,
  getUserIndex,
  getAllUserNotes,
  addUser,
  saveUserNote,
  removeUserNote
};
