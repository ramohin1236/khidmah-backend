import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/add', upload.single('image'), CategoryController.addCategory);
router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);
router.patch('/update/:id', upload.single('image'), CategoryController.updateCategory);
router.delete('/delete/:id', CategoryController.deleteCategory);

export const CategoryRoutes = router;
