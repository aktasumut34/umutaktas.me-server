const Joi = require("joi");
const createHttpError = require("http-errors");
module.exports = function (req, res, next) {
  const schema = Joi.object({
    slug: Joi.string().min(2).required(),
  });
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.params, options);
  if (error) {
    if (error.isJoi)
      return next(createHttpError(422, { message: error.message }));
    next(createHttpError(500));
  } else {
    req.body = value;
    next();
  }
};
