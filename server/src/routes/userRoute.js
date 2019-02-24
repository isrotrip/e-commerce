const router = require('express').Router();
const UserController = require('../controllers/userController');

router.post('/login', UserController.login);
//customer area
router.post('/register', UserController.registerCustomer);
//admin area
router.post('/registerAdminSecretRoute', UserController.registerAdmin);
router.get('/checkOnline', UserController.checkAllSignInCustomers);

module.exports = router;