const express = require('express');
const router = express.Router();
const adopterController = require('../controllers/adopterController');

router.get('/', adopterController.getAdopters);
router.get('/:id', adopterController.getAdopterById);
router.post('/', adopterController.createAdopter);
router.put('/:id', adopterController.updateAdopter);
router.delete('/:id', adopterController.deleteAdopter);

module.exports = router;
