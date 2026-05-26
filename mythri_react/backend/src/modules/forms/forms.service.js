const forms = [
  { id: 1, title: 'Admission Form', description: 'Collect new admission details' },
];

function listForms() {
  return forms;
}

function createForm(data) {
  const form = { id: Date.now(), ...data };
  forms.push(form);
  return form;
}

function updateForm(id, data) {
  const index = forms.findIndex((form) => String(form.id) === String(id));
  if (index === -1) return null;
  forms[index] = { ...forms[index], ...data };
  return forms[index];
}

function deleteForm(id) {
  const index = forms.findIndex((form) => String(form.id) === String(id));
  if (index === -1) return false;
  forms.splice(index, 1);
  return true;
}

module.exports = {
  listForms,
  createForm,
  updateForm,
  deleteForm,
};
