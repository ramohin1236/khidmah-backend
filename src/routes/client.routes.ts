import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/add', upload.any(), ClientController.addClient);
router.get('/', ClientController.getClients);
router.patch('/update/:id', upload.any(), ClientController.updateClient);
router.delete('/delete/:id', ClientController.deleteClient);

export const ClientRoutes = router;
