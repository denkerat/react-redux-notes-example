/**
 * Module dependencies.
 */
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const express = require('express');
const logger = require('./logger');
const routes = require('./routes');

/* Create Express server.*/
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8081);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// app.use(express.static(path.join(process.cwd(), 'public'), {maxAge: 31557600000}));

/**
 * Error Handler.
 */
app.use(errorHandler());

// Set header of response for cross-domain
app.use(function (req, res, next) {
  let {origin} = req.headers;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use('/', routes());

const URL = `http://localhost:${app.get('port')}`;

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  logger.info(`Node server started at ${URL} ${chalk.green('✓')}`);
});

