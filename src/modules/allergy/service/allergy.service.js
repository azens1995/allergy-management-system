const { getSortOrder } = require('../utils/queryParam');
const { isValidQuery } = require('../../../utils/queryValidate');
const { LIMIT, OFFSET } = require('../../../constants/queryConstant');
const allergyRepository = require('../repository/allergy.repository');

class AllergyService {
  constructor() {}

  /**
   * Retrieve all allergy with pagination and sorting
   * @param {*} limit Number of data to be retrieved
   * @param {*} offset Number of data to skip
   * @param {*} sort Order of the data
   * @returns List of the Allergy with count
   */
  async getAllAllergy(limit, offset, sort) {
    // Validate the limit and offset
    if (!isValidQuery(limit)) {
      // set default limit
      limit = LIMIT;
    }
    if (!isValidQuery(offset)) {
      offset = OFFSET;
    }

    return await allergyRepository.getAllergy(
      limit,
      offset,
      getSortOrder(sort)
    );
  }

  /**
   * Retrieve allergy by Id
   * @param {*} id Id of the allergy
   * @returns Allergy Item
   */
  async getAllergyById(id) {
    // Check if the Id is valid and is number
    if (!isValidQuery(id)) {
      throw new Error('Id is not defined. Please provide valid Id');
    }
    return allergyRepository.getAllergyById(id);
  }

  /**
   * Create allergy
   * @param {*} allergy Allergy Object to be created
   * @returns Status
   */
  async createAllergy(allergy) {
    return await allergyRepository.createAllergy(allergy);
  }

  /**
   * Delete allergy by Id
   * @param {*} id Id of the allergy
   * @returns
   */
  async deleteAllergyById(id) {
    return await allergyRepository.deleteAllergy(id);
  }

  /**
   * Update the allergy
   * @param {*} id Id of the allergy to be updated
   * @param {*} allergy Allergy object with updated data
   * @returns Updated allergy
   */
  async updateAllergy(id, allergy) {
    return await allergyRepository.updateAllergy(id, allergy);
  }

  /**
   * Add/update image in allergy
   * @param {*} id ID of the allergy to update
   * @param {*} image Image link to add in allergy
   * @returns response
   */
  async updateImageInAllergy(id, image) {
    return await allergyRepository.addImageInAllergy(id, image);
  }
}

module.exports = new AllergyService();
