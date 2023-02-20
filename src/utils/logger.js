const pine = require('pine');
const logger = pine();

class APILogger {
  info(message) {
    logger.info(message);
  }

  info(message, data) {
    logger.info(`${message}  ${data}`);
  }

  error(message) {
    logger.error(message);
  }
}

module.exports = new APILogger();
