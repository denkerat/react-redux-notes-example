const express = require('express');
const repository = require('./repository');
const logger = require('./logger');

const statuses = {
  OK: 'OK',
  NO_USER_ID: 'No userId provided'
};

const statusCodes = {
  USER_NOT_FOUND: 404,
  INVALID_DATA: 400
};

const getStatusCode = id => statusCodes[id] || 500;

module.exports = function () {
  let root = express.Router();

  root.get('/', (req, res) => {
    res.status(200).send(`Test Server API`);
  });

  /**
   * Add user
   */
  root.get('/users', ({query}, res) => {
    const {username} = query;
    repository.addUser(username).then(result => {
        res.status(200).send(statuses.OK);
      },
      ({id, err}) => res.status(getStatusCode(id)).send(err));
  });

  /**
   * Get notes
   */
  root.get('/notes', ({query}, res) => {
    const {userId} = query;
    if (userId) {
      repository.getAllUserNotes(userId).then(userNotes => {
        res.status(200).send(JSON.stringify(userNotes));
      }, ({id, err}) => {
        logger.error(err);
        res.status(getStatusCode(id)).send(err);
      });
    } else {
      res.status(getStatusCode(statusCodes.INVALID_DATA)).send(statuses.NO_USER_ID);
    }
  });

  /**
   * Save note
   */
  root.post('/notes', ({body, query}, res) => {
    const {note} = body;
    const {userId} = query;
    repository.saveUserNote(userId, note).then(newNote => {
        res.status(200).send(newNote);
      },
      ({id, err}) => res.status(getStatusCode(id)).send(err));
  });

  /**
   * Remove note
   */
  root.delete('/notes', ({query}, res) => {
    const userId = query.userId;
    const date = query.date;
    repository.removeUserNote(userId, date).then(result => {
        res.status(200).send(date);
      },
      ({id, err}) => res.status(getStatusCode(id)).send(err));
  });

  return express.Router().use('/api', root);
};

