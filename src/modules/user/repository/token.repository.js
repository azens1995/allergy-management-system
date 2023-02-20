const { connect } = require('../../../config/db.config');
const logger = require('../../../utils/logger');

class TokenRepository {
  db = {};

  constructor() {
    this.db = connect();
    // For Development
    this.db.sequelize.sync({ force: false }).then(() => {
      console.log('Drop and re-sync db.');
    });
  }

  // Save token to DB
  async saveToken(token) {
    try {
      const tokenRes = await this.db.token.create(token);
      return tokenRes;
    } catch (err) {
      logger.error(err);
    }
  }

  // Retrieve token info by userId
  async getTokenByUserId(userId) {
    try {
      const token = await this.db.token.findOne({
        where: { userId, isDeleted: false },
      });
      return token;
    } catch (err) {
      logger.error(err);
    }
  }

  // Retrieve token info by email
  async getTokenByEmail(email) {
    try {
      const token = await this.db.token.findOne({
        where: { email, isDeleted: false },
      });
      return token;
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = new TokenRepository();
