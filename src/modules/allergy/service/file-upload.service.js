const storage = require('../../../constants/storage');
const getFileName = require('../../../utils/fileNameGeneration');
const cloudStorage = require('../../../config/cloudinary.config');

const uploadFile = async (allergyId, file) => {
  const uploadResponse = await cloudStorage.uploader.upload(file.tempFilePath, {
    discard_original_filename: false,
    folder: storage.FOLDER,
    filename_override: getFileName(allergyId),
  });
  return uploadResponse;
};

module.exports = { uploadFile };
