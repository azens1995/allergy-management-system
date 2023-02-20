const isValidEmail = (email) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  }
  return false;
};

// Validate input for null and undefined
const isValidData = (input) => {
  if (input !== null || input !== '') {
    return true;
  }
  return false;
};

module.exports = {
  isValidEmail,
  isValidData,
};
