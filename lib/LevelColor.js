
const _ = require('lodash');
const chalk = require('chalk');

module.exports = {
  ALL: _.padStart('all', 5),
  DEBUG: chalk.gray(_.padStart('debug', 5)),
  INFO: chalk.cyan(_.padStart('info', 5)),
  WARN: chalk.yellow(_.padStart('warn', 5)),
  ERROR: chalk.bgMagenta(_.padStart('error', 5)),
  CRIT: chalk.bgRed(_.padStart('crit', 5)),
  CONSOLE: _.padStart('', 5),
  FILE: chalk.bgBlue(_.padStart('file', 5)),
  DEPTH: chalk.bgGreen(_.padStart('depth', 5)),
};
