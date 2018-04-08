'use strict';

const MoaLog = require('./lib/MoaLog');

module.exports = new MoaLog();
module.exports.MoaLog = MoaLog;

module.exports.LEVEL_ALL = MoaLog.L_ALL;
module.exports.L_ALL = MoaLog.L_ALL;
module.exports.LEVEL_DEBUG = MoaLog.L_DEBUG;
module.exports.L_DEBUG = MoaLog.L_DEBUG;
module.exports.LEVEL_INFO = MoaLog.L_INFO;
module.exports.L_INFO = MoaLog.L_INFO;
module.exports.LEVEL_WARN = MoaLog.L_WARN;
module.exports.L_WARN = MoaLog.L_WARN;
module.exports.LEVEL_WARNING = MoaLog.L_WARN;
module.exports.L_WARNING = MoaLog.L_WARN;
module.exports.LEVEL_ERROR = MoaLog.L_ERROR;
module.exports.L_ERROR = MoaLog.L_ERROR;
module.exports.LEVEL_CRIT = MoaLog.L_CRIT;
module.exports.L_CRIT = MoaLog.L_CRIT;
module.exports.LEVEL_CRITICAL = MoaLog.L_CRIT;
module.exports.L_CRITICAL = MoaLog.L_CRIT;
