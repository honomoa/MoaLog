'use strict';

const fs  = require('fs');
const util = require('util');
const path = require('path');

const _ = require('lodash');
const chalk = require('chalk');
const moment = require('moment');

const APP_DIR = path.dirname(require.main.filename);
const STACK_REGEX = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
const STACK_REGEX2 = /at\s+()(.*):(\d*):(\d*)/i;

class MoaLog {
  constructor(options) {
    this._level = _.get(options, 'level', MoaLog.LEVEL_DEBUG);
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
    let _method = stack[1];
    let _path = stack[2];
    let _bpath = path.basename(stack[2]);
    let _line = stack[3];
    let _pos = stack[4];

    let stackText = '';
    if (this._showStack) {
      stackText = chalk.gray(`${_bpath}:${_line}:${_pos}`);
      this._stackPadSize = _.max([this._stackPadSize, _.size(`${stackText || 0}`)]);
    }
    return `${_.padEnd(stackText, this._stackPadSize)}`;
  }

  _partialLogger(level) {
    if (this._showTime) {
      return _.partial(console.log, moment().format(this._timeFormat), level, this._stackPadText());
    } else {
      return _.partial(console.log, level, this._stackPadText());
    }
  }

  all() {
    if (this._level <= MoaLog.LEVEL_ALL) {
      let log = this._partialLogger('  all');
      log.apply(log, _.slice(arguments, 0));
    }
  }

  verbose() {
    return this.all;
  }

  debug() {
    if (this._level <= MoaLog.LEVEL_DEBUG) {
      let log = this._partialLogger(chalk.gray('debug'));
      log.apply(log, _.slice(arguments, 0));
    }
  }

  info() {
    if (this._level <= MoaLog.LEVEL_INFO) {
      let log = this._partialLogger(chalk.cyan(' info'));
      log.apply(log, _.slice(arguments, 0));
    }
  }

  warn() {
    if (this._level <= MoaLog.LEVEL_WARN) {
      let log = this._partialLogger(chalk.yellow(' warn'));
      log.apply(log, _.slice(arguments, 0));
    }
  }

  error() {
    if (this._level <= MoaLog.LEVEL_ERROR) {
      let log = this._partialLogger(chalk.bgMagenta('error'));
      log.apply(log, _.slice(arguments, 0));
    }
  }

  crit() {
    if (this._level <= MoaLog.LEVEL_CRIT) {
      let log = this._partialLogger(chalk.bgRed(' crit'));
      log.apply(log, _.slice(arguments, 0));
    }
  }

  console() {
    let log = this._partialLogger('     ');
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
      fs.writeFile(`${APP_DIR}/${name}`, `${msg}\n`, {flag: 'a+'}, () => {});
    } else {
      fs.writeFileSync(`${APP_DIR}/${name}`, `${msg}\n`, {flag: 'a+'});
    }
    if (this._showFileLogger) {
      let log = this._partialLogger(chalk.bgBlue(' file'));
      log.call(log, `log to ${APP_DIR}/${name}`);
    }
  }

  get inspect() {
    return this.depth;
  }

  depth(object) {
    let log = this._partialLogger(chalk.bgGreen('depth'));
    log.apply(log, [util.inspect(object, { showHidden: true, depth: null })]);
  }
}

MoaLog.LEVEL_ALL = MoaLog.L_ALL = 0;
MoaLog.LEVEL_DEBUG = MoaLog.L_DEBUG = 1;
MoaLog.LEVEL_INFO = MoaLog.L_INFO = 2;
MoaLog.LEVEL_WARN = MoaLog.L_WARN = MoaLog.LEVEL_WARNING = MoaLog.L_WARNING = 3;
MoaLog.LEVEL_ERROR = MoaLog.L_ERROR = 4;
MoaLog.LEVEL_CRIT = MoaLog.L_CRIT = MoaLog.LEVEL_CRITICAL = MoaLog.L_CRITICAL = 5;

module.exports = exports = MoaLog;
