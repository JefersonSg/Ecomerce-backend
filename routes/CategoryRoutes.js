const router = require('express').Router();

const CategoryController = require('../controllers/CategoryController');
const { imageUpload } = require('../helpers/imageUpload');

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getCategoryById);
router.post(
  '/create',
  imageUpload.single('image'),
  CategoryController.createCategory,
);

router.patch(
  '/:id',
  imageUpload.single('image'),
  CategoryController.updateCategory,
);

router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
