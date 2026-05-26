const loginSchema = {
  validate(body) {
    const errors = [];
    if (!body?.email) errors.push({ message: 'Email is required' });
    if (!body?.password) errors.push({ message: 'Password is required' });

    return errors.length
      ? { error: { message: errors.map((item) => item.message).join(', '), statusCode: 400 } }
      : { value: body };
  },
};

module.exports = {
  loginSchema,
};
