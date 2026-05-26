const files = [
  { id: 1, name: 'sample.pdf', size: 12048 },
];

function listFiles() {
  return files;
}

function uploadFile(data) {
  const file = { id: Date.now(), ...data };
  files.push(file);
  return file;
}

function deleteFile(id) {
  const index = files.findIndex((file) => String(file.id) === String(id));
  if (index === -1) return false;
  files.splice(index, 1);
  return true;
}

module.exports = {
  listFiles,
  uploadFile,
  deleteFile,
};
