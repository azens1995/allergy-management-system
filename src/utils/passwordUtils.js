const bcrypt = require('bcrypt');
const logger = require('./logger');

const saltRounds = parseInt(process.env.SALT_ROUND, 10) || 10;

const securePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const verifyHashedPassword = (password, hash) => {
  return bcrypt
    .compare(password, hash)
    .then((res) => {
      if (res) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      logger.error(err);
    });
};

module.exports = {
  securePassword,
  verifyHashedPassword,
};
