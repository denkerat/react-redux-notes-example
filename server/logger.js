/**
 * Initialize logger.
 *
 * This component initializes the application's logger.
 */
const moment = require('moment');
const path = require('path');
const fs = require('fs');

let logLevelNames = ['Trace', 'Debug', 'Info', 'Warn', 'Error', 'Fatal'];
let level = 5;
let LOG_FILE_NAME = 'server.log';
let filePath = path.resolve(process.cwd(), LOG_FILE_NAME);
let logStream = fs.createWriteStream(filePath, {flags: 'a'});

/**
 * Log message
 * @param level
 * @param text
 */
const log = (level, text) => {
  if (typeof text === 'object') {
    text = JSON.stringify(text);
  }

  let time = moment().format('DD-MM-YYYY HH:mm:ss');
  let message = `${time} [${logLevelNames[level]}] ${text}`;
  // Log to console
  console.log(message);
  // Log to file
  logStream.write(message + '\n');
};

const fatal = message => {
  if (level >= 0)
    log(5, message);
};

const error = message => {
  if (level >= 1)
    log(4, message);
};

const warn = message => {
  if (level >= 2)
    log(3, message);
};

const info = message => {
  if (level >= 3)
    log(2, message);
};

const debug = message => {
  if (level >= 4)
    log(1, message);
};

const trace = message => {
  if (level >= 5)
    log(0, message);
};

module.exports = {log, fatal, error, warn, info, debug, trace};
