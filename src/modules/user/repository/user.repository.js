const { connect } = require('../../../config/db.config');
const logger = require('../../../utils/logger');

class UserRepository {
  db = {};

  constructor() {
    this.db = connect();
    // For Development
    this.db.sequelize.sync({ force: false }).then(() => {
      console.log('Drop and re-sync db.');
    });
  }

  // Create user
  async addUser(user) {
    try {
      const data = await this.db.user.create(user);
      logger.info('User::', data);
      return data;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  // Get user by userId
  async findUserById(id) {
    try {
      const user = await this.db.user.findOne({ where: { id } });
      return user;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  // Check user exists by email
  async findUserByEmail(email) {
    try {
      const user = await this.db.user.findOne({ where: { email: email } });
      return user?.dataValues;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  // Update user
  async updateUser(user) {
    try {
      user.updatedAt = new Date().toISOString();
      const data = await this.db.user.update(user);
      logger.info('User::', data);
      return data;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  // Deactivate user
  async deactivateUser(id) {
    try {
      // Get user by Id
      const user = await this.findUserById(id);
      user.isDeleted = true;
      await this.updateUser(user);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

module.exports = new UserRepository();
