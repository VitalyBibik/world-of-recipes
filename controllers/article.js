const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const AccessDeniedError = require('../errors/AccessDeniedError');
const { msgDelArt } = require('../constants/constant');
const { msgArtNull } = require('../constants/constant');
const { msgAccessDenied } = require('../constants/constant');

module.exports.getArticle = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userGetArticle = await Article.find({ owner: userId })
      .orFail(() => new NotFoundError(msgArtNull));
    return res.send(userGetArticle);
  } catch (err) {
    return next(err);
  }
};
module.exports.deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;
  try {
    const articleDeleteCard = await Article.findById(articleId).populate('owner')
      .orFail(() => new NotFoundError(msgDelArt));
    if (!articleDeleteCard.owner.equals(req.user._id)) {
      throw new AccessDeniedError(msgAccessDenied);
    }
    await articleDeleteCard.remove();
    return res.send(articleDeleteCard.delOwner());
  } catch (err) {
    return next(err);
  }
};
module.exports.createArticle = async (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  try {
    const userCreateArticle = await Article.create({
      keyword, title, text, date, source, link, image, owner: req.user._id,
    });
    return res.status(201).send(userCreateArticle.delOwner());
  } catch (err) {
    return next(err);
  }
};
