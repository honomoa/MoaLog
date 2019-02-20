'use strict';

const MoaLog = require('./lib/MoaLog');
const LogLevel = require('./lib/LogLevel');

module.exports = new MoaLog();
module.exports.MoaLog = MoaLog;

module.exports.LEVEL_ALL = LogLevel.ALL;
module.exports.L_ALL = LogLevel.ALL;
module.exports.LEVEL_DEBUG = LogLevel.DEBUG;
module.exports.L_DEBUG = LogLevel.DEBUG;
module.exports.LEVEL_INFO = LogLevel.INFO;
module.exports.L_INFO = LogLevel.INFO;
module.exports.LEVEL_WARN = LogLevel.WARN;
module.exports.L_WARN = LogLevel.WARN;
module.exports.LEVEL_WARNING = LogLevel.WARN;
module.exports.L_WARNING = LogLevel.WARN;
module.exports.LEVEL_ERROR = LogLevel.ERROR;
module.exports.L_ERROR = LogLevel.ERROR;
module.exports.LEVEL_CRIT = LogLevel.CRIT;
module.exports.L_CRIT = LogLevel.CRIT;
module.exports.LEVEL_CRITICAL = LogLevel.CRIT;
module.exports.L_CRITICAL = LogLevel.CRIT;
