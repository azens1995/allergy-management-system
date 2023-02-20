const logger = require('../../../utils/logger');
const isImage = require('../../../utils/fileTypeCheck');
const { status } = require('../../../constants/httpCode');
const allergyService = require('../service/allergy.service');
const { uploadFile } = require('../service/file-upload.service');
const { message, errors } = require('../../../constants/httpMessage');

const getAllAllergy = async (req, res) => {
  try {
    const { limit, offset, sort } = req.query;
    const allergies = await allergyService.getAllAllergy(limit, offset, sort);
    return res.status(status.SUCCESS).json({
      status: status.SUCCESS,
      data: allergies,
      message: message.ALLERGY_RETRIEVED,
    });
  } catch (err) {
    logger.error(err);
    return res.status(status.BAD_REQUEST).json({
      status: status.BAD_REQUEST,
      data: null,
      message: err.message,
    });
  }
};

const getAllergyById = async (req, res) => {
  try {
    const id = req.params.allergyId;
    const data = await allergyService.getAllergyById(id);
    return res.status(status.SUCCESS).json({
      status: status.SUCCESS,
      data: data,
      message: message.ALLERGY_RETRIEVED,
    });
  } catch (err) {
    logger.error(err);
    return res.status(status.BAD_REQUEST).json({
      status: status.BAD_REQUEST,
      data: null,
      message: err.message,
    });
  }
};

const createAllergy = async (req, res) => {
  try {
    logger.info('Create Allergy');
    const allergyRes = await allergyService.createAllergy(req.body);
    return res.status(status.CREATED).json({
      status: status.CREATED,
      data: allergyRes,
      message: message.ALLERGY_CREATED,
    });
  } catch (err) {
    logger.error(err);
    return res.status(status.BAD_REQUEST).json({
      status: status.BAD_REQUEST,
      data: null,
      message: err.message,
    });
  }
};

const updateAllergy = async (req, res) => {
  try {
    const id = req.params.allergyId;
    const allergyToUpdate = req.body;
    const data = await allergyService.updateAllergy(id, allergyToUpdate);
    return res.status(status.SUCCESS).json({
      status: status.SUCCESS,
      data: data,
      message: message.ALLERGY_UPDATED,
    });
  } catch (err) {
    logger.error(err);
    return res.status(status.BAD_REQUEST).json({
      status: status.BAD_REQUEST,
      data: null,
      message: err.message,
    });
  }
};

const deleteAllergy = async (req, res) => {
  try {
    const id = req.params.allergyId;
    await allergyService.deleteAllergyById(id);
    return res.status(status.SUCCESS).json({
      status: status.SUCCESS,
      data: null,
      message: message.ALLERGY_DELETED,
    });
  } catch (err) {
    logger.error(err);
    return res.status(status.BAD_REQUEST).json({
      status: status.BAD_REQUEST,
      data: null,
      message: err.message,
    });
  }
};

const uploadAllergyImage = async (req, res) => {
  try {
    const allergyId = req.params.allergyId;
    if (!allergyId) {
      throw new Error(errors.VALID_ID);
    }
    // Preserve the uploaded path for the retrieval of the image
    if (!req.files) {
      throw new Error(errors.FILE_REQUIRED);
    }
    const file = req.files.photo;
    if (!isImage(file.mimetype)) {
      throw new Error(errors.VALID_IMAGE);
    }
    const { original_filename, url } = await uploadFile(allergyId, file);
    //TODO: Save the uploaded file data to the new database table for retrieval
    await allergyService.updateImageInAllergy(allergyId, url);
    return res.status(status.SUCCESS).json({
      status: status.SUCCESS,
      data: null,
      message:
        'File uploaded successfully ' +
        original_filename +
        '.' +
        uploadResponse.format,
    });
  } catch (err) {
    logger.error(err);
    return res.status(status.BAD_REQUEST).json({
      status: status.BAD_REQUEST,
      data: null,
      message: err.message,
    });
  }
};

module.exports = {
  getAllAllergy,
  createAllergy,
  getAllergyById,
  updateAllergy,
  deleteAllergy,
  uploadAllergyImage,
};
