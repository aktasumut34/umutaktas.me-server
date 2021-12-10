const Joi = require("joi");
module.exports = {
  getArticleValidator: function (req, res, next) {
    const schema = Joi.object({
      slug: Joi.string().min(2).required().messages({
        "string.base": "the provided string is not a valid article name",
        "string.required": "article name is required",
        "string.min": "article name must be minimum 2 characters long",
      }),
    });
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
      escapeHtml: true,
    };
    const { error, value } = schema.validate(req.params, options);
    if (error) {
      if (error.isJoi) return res.status(422).json({ message: error.message });
      res.status(500).json({
        message:
          "There are unhandled errors on the server, please try again later!",
      });
    } else {
      req.body = value;
      next();
    }
  },
};
