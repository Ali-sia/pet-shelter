const express = require('express');

const { cats: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrl.getCatsList);
router.post('/', ctrl.addNewCat);

router.get('/:catId', ctrl.getCat);
// router.put('/:catId', ctrl.updateCat);
// router.delete('/:catId', ctrl.deleteCat);

// router.patch('/:catId/status', ctrl.updateCatStatus);

module.exports = router;
