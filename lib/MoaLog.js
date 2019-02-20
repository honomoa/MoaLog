'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');

const _ = require('lodash');
const chalk = require('chalk');
const moment = require('moment');

const LEVEL_COLOR = require('./LevelColor');
const LOG_LEVEL = require('./LogLevel');
const APP_DIR = path.dirname(require.main.filename);
const STACK_REGEX = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
const STACK_REGEX2 = /at\s+()(.*):(\d*):(\d*)/i;

class MoaLog {
  constructor(options) {
    this._level = _.get(options, 'level', LOG_LEVEL.DEBUG);
    this._showColor = _.get(options, 'showColor', true);
    this._showTime = _.get(options, 'showTime', false);
    this._timeFormat = _.get(options, 'timeFormat', 'YYYY-MM-DD HH:mm:ss.SSS');
    this._showStack = _.get(options, 'showStack', true);
    this._showFileLogger = _.get(options, 'showFileLogger', true);
    this._fileLoggerAsync = _.get(options, 'fileLoggerAsync', true);
    this._fileLoggerOutput = _.get(options, 'fileLoggerOutput', 'MoaLog.log');
    this._stackPadSize = 0;

    if (!this._showColor) {
      chalk.enabled = false;
    }
  }

  getLevel() {
    return this._level;
  }

  setLevel(level) {
    this._level = level;
  }

  _getStack() {
    let stacklist = (new Error()).stack.split('\n').slice(5);
    let s = stacklist[0];
    let sp = STACK_REGEX.exec(s) || STACK_REGEX2.exec(s);
    return sp && sp.length === 5 ? sp : [];
  }

  // method = 1;
  // path = 2;
  // line = 3;
  // pos = 4;
  _stackPadText() {
    let stack = this._getStack();
    let _bpath = path.basename(stack[2]);
    let _line = stack[3];
    let _pos = stack[4];

    let stackText = '';
    if (this._showStack) {
      stackText = chalk.gray(`${_bpath}:${_line}:${_pos}`);
      this._stackPadSize = _.max([ this._stackPadSize, _.size(`${stackText || 0}`) ]);
    }
    return `${_.padEnd(stackText, this._stackPadSize)}`;
  }

  _partialLogger(levelText) {
    if (this._showTime) {
      return _.partial(console.log, moment().format(this._timeFormat), levelText, this._stackPadText());
    } else {
      return _.partial(console.log, levelText, this._stackPadText());
    }
  }

  all() {
    if (this._level <= LOG_LEVEL.ALL) {
      let log = this._partialLogger(LEVEL_COLOR.ALL);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  verbose() {
    return this.all;
  }

  debug() {
    if (this._level <= LOG_LEVEL.DEBUG) {
      let log = this._partialLogger(LEVEL_COLOR.DEBUG);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  info() {
    if (this._level <= LOG_LEVEL.INFO) {
      let log = this._partialLogger(LEVEL_COLOR.INFO);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  warn() {
    if (this._level <= LOG_LEVEL.WARN) {
      let log = this._partialLogger(LEVEL_COLOR.WARN);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  error() {
    if (this._level <= LOG_LEVEL.ERROR) {
      let log = this._partialLogger(LEVEL_COLOR.ERROR);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  crit() {
    if (this._level <= LOG_LEVEL.CRIT) {
      let log = this._partialLogger(LEVEL_COLOR.CRIT);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  console() {
    let log = this._partialLogger(LEVEL_COLOR.CONSOLE);
    log.apply(log, _.slice(arguments, 0));
  }

  get log() {
    return this.console;
  }

  file(name, msg) {
    if (arguments.length === 1) {
      msg = _.isObject(name) ? JSON.stringify(name) : name;
      name = this._fileLoggerOutput;
    } else if (arguments.length === 2) {
      if (_.isObject(msg)) {
        msg = JSON.stringify(msg);
      }
    }
    if (this._fileLoggerAsync) {
      fs.writeFile(`${APP_DIR}/${name}`, `${msg}\n`, { flag: 'a+' }, () => {});
    } else {
      fs.writeFileSync(`${APP_DIR}/${name}`, `${msg}\n`, { flag: 'a+' });
    }
    if (this._showFileLogger) {
      let log = this._partialLogger(LEVEL_COLOR.FILE);
      log.call(log, `log to ${APP_DIR}/${name}`);
    }
  }

  get inspect() {
    return this.depth;
  }

  depth(object) {
    let log = this._partialLogger(LEVEL_COLOR.DEPTH);
    log.apply(log, [ util.inspect(object, { showHidden: true, depth: null }) ]);
  }
}

module.exports = exports = MoaLog;
