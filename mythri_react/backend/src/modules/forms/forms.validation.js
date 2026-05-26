const formSchema = {
  validate(body) {
    if (!body?.title) {
      return { error: { message: 'Title is required', statusCode: 400 } };
    }

    return { value: body };
  },
};

module.exports = {
  formSchema,
};
