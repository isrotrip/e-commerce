const router = require('express').Router();
const CartController = require('../controllers/cartController');
const { authorizated } = require('../middlewares/verify')

router.get('/', CartController.read);
router.post('/', CartController.add);
router.use('/:id/:itemId', authorizated);
router.put('/:id/:itemId', CartController.update);
router.delete('/:id/:itemId', CartController.remove);

module.exports = router;