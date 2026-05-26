function log(message, meta = {}) {
  if (Object.keys(meta).length > 0) {
    console.log(message, meta);
    return;
  }

  console.log(message);
}

module.exports = {
  log,
};
