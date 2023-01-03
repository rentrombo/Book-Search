const chalk = require('chalk');

// chalk message themes
const infoColor = chalk.green;
const warningColor = chalk.red;
const errorColor = chalk.bgredBright;
const helloByeColor = chalk.bold.cyanBright;
const titleColor = chalk.magenta;
const authorsColor = chalk.whiteBright;
const publisherColor = chalk.whiteBright;

module.exports = {
  infoColor,
  warningColor,
  errorColor,
  helloByeColor,
  titleColor,
  authorsColor,
  publisherColor,
};