const router = require('express').Router();

const UserController = require('../controllers/UserController');

// middleware
// const checkToken = require('../helpers/checkToken');
const { imageUpload } = require('../helpers/imageUpload');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/admin/login', UserController.loginAdmin);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.patch(
  '/edit/:id',
  // checkToken,
  imageUpload.single('image'),
  UserController.editUser,
);

module.exports = router;
