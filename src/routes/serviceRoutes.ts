import { Router } from 'express';
import * as serviceController from '../controllers/serviceController';

const router = Router();

// GET all services
router.get('/', serviceController.getAllServices);

// GET service by ID
router.get('/:id', serviceController.getServiceById);

// POST create service
router.post('/', serviceController.createService);

// PUT update service
router.put('/:id', serviceController.updateService);

// DELETE service
router.delete('/:id', serviceController.deleteService);

export default router;
