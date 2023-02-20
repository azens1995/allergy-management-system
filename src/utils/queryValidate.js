const isValidQuery = (query) => {
  if (query !== '' && query !== 'undefined') {
    return true;
  }
  return false;
};

module.exports = { isValidQuery };
