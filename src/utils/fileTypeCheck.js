const { fileTypes } = require('../constants/fileConstant');

const isImage = (file) => {
  if (fileTypes.IMAGE.match(file)) {
    return true;
  }
  return false;
};

module.exports = isImage;
