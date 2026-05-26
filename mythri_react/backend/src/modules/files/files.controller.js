const filesService = require('./files.service');
const ApiError = require('../../utils/ApiError');

function list(req, res) {
  res.json(filesService.listFiles());
}

function upload(req, res) {
  res.status(201).json(filesService.uploadFile(req.body));
}

function remove(req, res, next) {
  const deleted = filesService.deleteFile(req.params.id);
  if (!deleted) {
    return next(new ApiError(404, 'File not found'));
  }

  return res.status(204).send();
}

module.exports = {
  list,
  upload,
  remove,
};
