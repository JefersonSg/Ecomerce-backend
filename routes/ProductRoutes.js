const router = require('express').Router();

const ProductController = require('../controllers/ProductController');

// middleware
// const checkToken = require('../helpers/checkToken');

const { imageUpload } = require('../helpers/imageUpload');

// GETS
router.get('/', ProductController.getAll);
router.get('/teste', ProductController.teste);
router.get('/:id', ProductController.getProductById);
router.get('/categories/:id', ProductController.getProductByCategory);

// POST
router.post('/create', imageUpload.array('images'), ProductController.create);

// UPDATE
router.patch(
  '/edit/:id',
  imageUpload.array('images'),
  ProductController.updateProduct,
);

router.delete('/:id', ProductController.removeProductById);

module.exports = router;
