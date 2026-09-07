import { Router } from 'express';
import { ClientController } from '../controllers/clientController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { createClientSchema, updateClientSchema } from '../models/schemas.js';

const router = Router();

router.use(authenticateToken);

router.post('/', validateBody(createClientSchema), ClientController.create);
router.get('/', ClientController.listAll);
router.get('/:id', ClientController.getById);
router.put('/:id', validateBody(updateClientSchema), ClientController.update);
router.delete('/:id', ClientController.delete);

export default router;