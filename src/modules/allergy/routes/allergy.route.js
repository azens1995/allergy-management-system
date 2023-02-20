const express = require('express');
const router = express.Router();
const allergyController = require('../controllers/allergy.controller');
const { auth } = require('../../../utils/authenticationMiddleware');

router.get('/', auth, allergyController.getAllAllergy);
router.post('/', auth, allergyController.createAllergy);
router.put('/:allergyId', auth, allergyController.updateAllergy);
router.get('/:allergyId', auth, allergyController.getAllergyById);
router.delete('/:allergyId', auth, allergyController.deleteAllergy);
// Upload allergy image
router.post('/upload/:allergyId', allergyController.uploadAllergyImage);

module.exports = router;
