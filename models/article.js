const mongoose = require('mongoose');
const validatorCards = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validatorCards.isURL(link),
      message: (props) => `${props.value} is not valid link!`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validatorCards.isURL(link),
      message: (props) => `${props.value} is not valid link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
    required: true,
  },
});
/*
articleSchema.methods.delOwner = function delOwner() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};
*/

module.exports = mongoose.model('article', articleSchema);
