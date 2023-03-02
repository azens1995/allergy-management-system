const express = require('express');
const router = express.Router();
const allergyController = require('../controllers/allergy.controller');
const { auth } = require('../../../auth/authenticationMiddleware');

router.get('/', auth, allergyController.getAllAllergy);
router.post('/', auth, allergyController.createAllergy);
router.put('/:allergyId', auth, allergyController.updateAllergy);
router.get('/:allergyId', auth, allergyController.getAllergyById);
router.delete('/:allergyId', auth, allergyController.deleteAllergy);
// Upload allergy image
router.post(
  '/upload-image/:allergyId',
  auth,
  allergyController.uploadAllergyImage
);

module.exports = router;
