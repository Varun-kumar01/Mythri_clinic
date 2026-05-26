// const express = require('express');
// const formsController = require('./forms.controller');
// const validate = require('../../middlewares/validate.middleware');
// const { formSchema } = require('./forms.validation');

// const router = express.Router();

// router.get('/', formsController.list);
// router.post('/', validate(formSchema), formsController.create);
// router.put('/:id', validate(formSchema), formsController.update);
// router.delete('/:id', formsController.remove);

// module.exports = router;

const express = require('express');
const formsController = require('./forms.controller');
const validate = require('../../middlewares/validate.middleware');
const { formSchema } = require('./forms.validation');

const router = express.Router();

router.post('/', validate(formSchema), formsController.createForm);

module.exports = router;