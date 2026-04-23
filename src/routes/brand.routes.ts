import { Router } from 'express';
import { BrandController } from '../controllers/brand.controller';
import { upload } from '../middlewares/upload';

const router = Router();

// Using upload.none() to support form-data without files
router.post('/add', upload.none(), BrandController.addBrand);
router.get('/', BrandController.getBrands);
router.get('/:id', BrandController.getBrandById);
router.patch('/update/:id', upload.none(), BrandController.updateBrand);
router.delete('/delete/:id', BrandController.deleteBrand);

export const BrandRoutes = router;
