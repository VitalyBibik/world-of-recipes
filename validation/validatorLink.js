const validator = require('validator');

const validatorURL = (link) => {
  if (!validator.isURL(link)) {
    throw new Error('invalid avatar link');
  }
  return link;
};
module.exports = { validatorURL };
