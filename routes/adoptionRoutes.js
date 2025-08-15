const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');

router.get('/', adoptionController.getAdoptions);
router.get('/:id', adoptionController.getAdoptionById);
router.post('/', adoptionController.createAdoption);
router.put('/:id', adoptionController.updateAdoption);
router.delete('/:id', adoptionController.deleteAdoption);

module.exports = router;
