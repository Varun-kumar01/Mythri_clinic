const fileSchema = {
  validate(body) {
    if (!body?.name) {
      return { error: { message: 'File name is required', statusCode: 400 } };
    }

    return { value: body };
  },
};

module.exports = {
  fileSchema,
};
