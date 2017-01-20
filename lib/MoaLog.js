'use strict';

const fs  = require('fs');
const util = require('util');
const path = require('path');

const _ = require('lodash');
require('colors').enabled = true;

const appDir = path.dirname(require.main.filename);
const STACK_REGEX = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
const STACK_REGEX2 = /at\s+()(.*):(\d*):(\d*)/i;

class MoaLog {
  constructor() {
    this._level = MoaLog.LEVEL_DEBUG;
    this._preFormatSize = 1;
  }

  get level() {
    return this._level;
  }

  set level(level) {
    this._level = level;
  }

  getLevel() {
    return this.level;
  }

  setLevel(level) {
    this.level = level;
  }

  get preFormatSize() {
    return this._preFormatSize;
  }

  set preFormatSize(preFormatSize) {
    this._preFormatSize = preFormatSize;
  }

  get stack() {
    let stacklist = (new Error()).stack.split('\n').slice(5);
    let s = stacklist[0];
    let sp = STACK_REGEX.exec(s) || STACK_REGEX2.exec(s);
    return sp && sp.length === 5 ? sp : [];
  }

  // method = 1;
  // path = 2;
  // preFormat = 3;
  // pos = 4;
  get preFormat() {
    let _method = this.stack[1];
    let _path = this.stack[2];
    let _bpath = path.basename(this.stack[2]);
    let _line = this.stack[3];
    let _pos = this.stack[4];

    const preFormat = function () {
      return `${_bpath}:${_line}:${_pos}`.grey;
    };

    this.preFormatSize = _.max([this.preFormatSize, _.size(`${preFormat() || 0}`)]);
    return `${_.padEnd(preFormat(), this.preFormatSize)}`;
  }

  _formatPrint(level) {
    return _.partial(console.log, level, this.preFormat);
  }

  all() {
    if (this.level <= MoaLog.LEVEL_ALL) {
      let log = this._formatPrint('  all');
      log.apply(log, _.slice(arguments, 0));
    }
  }

  debug() {
    if (this.level <= MoaLog.LEVEL_DEBUG) {
      let log = this._formatPrint('debug'.grey);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  info() {
    if (this.level <= MoaLog.LEVEL_INFO) {
      let log = this._formatPrint(' info'.cyan);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  warn() {
    if (this.level <= MoaLog.LEVEL_WARN) {
      let log = this._formatPrint(' warn'.yellow);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  error() {
    if (this.level <= MoaLog.LEVEL_ERROR) {
      let log = this._formatPrint('error'.bgMagenta);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  crit() {
    if (this.level <= MoaLog.LEVEL_CRIT) {
      let log = this._formatPrint(' crit'.bgRed);
      log.apply(log, _.slice(arguments, 0));
    }
  }

  console() {
    let log = this._formatPrint('     ');
    log.apply(log, _.slice(arguments, 0));
  }

  get log() {
    return this.console;
  }

  file(name, msg) {
    if (msg.toString() === '[object Object]') {
      msg = JSON.stringify(msg);
    }
    fs.writeFileSync(`${appDir}/${name}`, `${msg}\n`, {flag: 'a+'});
    let log = this._formatPrint(' file'.blue);
    log(`log to ${appDir}/${name}`);
  }

  inspect(object) {
    let log = this._formatPrint('inspt'.green);
    log.apply(log, [util.inspect(object, { showHidden: true, depth: null })]);
    // console.log(this.preFormat, );
  }
}

MoaLog.LEVEL_ALL = MoaLog.L_ALL = 0;
MoaLog.LEVEL_DEBUG = MoaLog.L_DEBUG = 1;
MoaLog.LEVEL_INFO = MoaLog.L_INFO = 2;
MoaLog.LEVEL_WARN = MoaLog.L_WARN = 3;
MoaLog.LEVEL_WARNING = MoaLog.L_WARNING = 3;
MoaLog.LEVEL_ERROR = MoaLog.L_ERROR = 4;
MoaLog.LEVEL_CRIT = MoaLog.L_CRIT = 5;
MoaLog.LEVEL_CRITICAL = MoaLog.L_CRITICAL = 5;

module.exports = exports = MoaLog;
