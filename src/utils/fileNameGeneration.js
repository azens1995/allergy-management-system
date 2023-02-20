const fileConstants = require('../constants/fileConstant');

const getFileName = (id) => {
  return (
    fileConstants.image.PREFIX +
    fileConstants.image.DASH +
    id +
    fileConstants.image.EXTENSION
  );
};

module.exports = getFileName;
