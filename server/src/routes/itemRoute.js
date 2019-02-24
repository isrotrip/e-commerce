const router = require('express').Router();
const ItemController = require('../controllers/itemController');
const images = require('../helpers/images')
const {adminSection} = require('../middlewares/verify')

router.get('/', ItemController.read);
router.use(adminSection);
router.post('/uploadPhoto', images.multer.single('image'), images.sendUploadToGCS, ItemController.uploadPhoto);
router.post('/', ItemController.add);
router.delete('/:id', ItemController.remove);
router.put('/:id', ItemController.update);

module.exports = router;