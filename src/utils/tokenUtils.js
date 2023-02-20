const logger = require('./logger');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_PK = process.env.ACCESS_TOKEN_PK;
const REFRESH_TOKEN_PK = process.env.REFRESH_TOKEN_PK;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

// Generate access and refresh tokens
const generateTokens = async (user) => {
  try {
    const payload = { _id: user.id, email: user.email };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_PK, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_PK, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    logger.error(err);
    return Promise.reject(err);
  }
};

// validate access token
const validateAccessToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN_PK, (err, tokenDetails) => {
      if (err) {
        return reject({ error: true, message: 'Invalid access token' });
      }
      resolve({
        tokenDetails,
        error: false,
        message: 'Token is valid',
      });
    });
  });
};

// validate access token
const validateRefreshToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_TOKEN_PK, (err, tokenDetails) => {
      if (err) {
        return reject({ error: true, message: 'Invalid refresh token' });
      }
      resolve({
        tokenDetails,
        error: false,
        message: 'Token is valid',
      });
    });
  });
};

module.exports = {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
};
