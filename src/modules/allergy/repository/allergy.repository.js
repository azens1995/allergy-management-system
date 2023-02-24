const { connect } = require('../../../config/db.config');
const logger = require('../../../utils/logger');
const { COLUMNS, SORT_ORDER } = require('../utils/queryParam');

class AllergyRepository {
  constructor() {
    this.db = connect();
  }

  // Retrieve all allergy
  async getAllergy(limit, offset, sort) {
    try {
      const allergy = await this.db.allergy.findAndCountAll({
        offset,
        limit,
        order: [[COLUMNS.HIGH_RISK, SORT_ORDER.DSC], sort],
      });
      logger.info('Allergy::', allergy);
      return allergy;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getAllergyById(id) {
    try {
      // Using findByPk method provided by sequelize since
      // primary key is the id of the allergy
      const allergy = await this.db.allergy.findByPk(id);
      logger.info('Allergy for ID ::', allergy);
      return allergy;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  // Create allergy
  async createAllergy(allergy) {
    let data = {};
    try {
      data = await this.db.allergy.create(allergy);
    } catch (err) {
      logger.error(err);
      throw err;
    }
    return data;
  }

  // Update allergy
  async updateAllergy(id, allergy) {
    let data = {};
    try {
      allergy.updatedAt = new Date().toISOString();
      data = await this.db.allergy.update(allergy, { where: { id } });
    } catch (err) {
      logger.error(err);
      throw err;
    }
    return data;
  }

  // Update image in allergy
  async addImageInAllergy(id, image) {
    let data = {};
    try {
      data = await this.db.allergy.update({ image }, { where: { id } });
    } catch (err) {
      logger.error(err);
      throw err;
    }
    return data;
  }

  // Delete allergy by ID
  async deleteAllergy(id) {
    let data = {};
    try {
      data = await this.db.allergy.destroy({
        where: {
          id,
        },
      });
      return data;
    } catch (err) {
      logger.error(err);
      throw err;
    }
    return data;
  }
}

module.exports = new AllergyRepository();
