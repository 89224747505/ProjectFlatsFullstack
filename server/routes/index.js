const Router = require('express');
const filterController = require("../controllers/filterController");
const flatController = require("../controllers/flatController")
const router = new Router();

router.get('/filter', filterController.filter);
router.get('/elements', filterController.filterElements);
router.get('/map', flatController.flatByFloorPosition);
router.get('/:id', flatController.flatByID);


module.exports = router;
