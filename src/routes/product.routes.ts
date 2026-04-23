import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();

router.post('/', ProductController.addProduct);
router.get('/', ProductController.getProducts);
router.patch('/update/:id', ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);

export const ProductRoutes = router;
