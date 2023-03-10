const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const { status } = require('../constants/httpCode');

const accessTokenSecret = process.env.ACCESS_TOKEN_PK;

const auth = (req, res, next) => {
  // retrieve the authorization header
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(status.UNAUTHORIZED).json({
        status: status.UNAUTHORIZED,
        data: null,
        message: err.message,
      });
    }
    // separate the bearer and token
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, (err, tokenDetails) => {
      if (err) {
        return res.status(status.UNAUTHORIZED).json({
          status: status.UNAUTHORIZED,
          data: null,
          message: err.message,
        });
      }
      return next();
    });
  } catch (err) {
    logger.error(err);
    return res.status(status.UNAUTHORIZED).json({
      status: status.UNAUTHORIZED,
      data: null,
      message: err.message,
    });
  }
};

module.exports = { auth };
