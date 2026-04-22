import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();

router.post('/', ProductController.addProduct);
router.get('/', ProductController.getProducts);

export const ProductRoutes = router;
