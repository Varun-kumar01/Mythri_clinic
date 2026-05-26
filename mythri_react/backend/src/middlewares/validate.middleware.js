function validate(schema) {
  return (req, res, next) => {
    if (!schema || typeof schema.validate !== 'function') {
      return next();
    }

    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      error.statusCode = 400;
      return next(error);
    }

    req.body = value;
    return next();
  };
}

module.exports = validate;
