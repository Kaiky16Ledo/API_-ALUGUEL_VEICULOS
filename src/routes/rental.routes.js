import { Router } from 'express';
import { RentalController } from '../controllers/rentalController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { createRentalSchema } from '../models/schemas.js';

const router = Router();

router.use(authenticateToken);

router.post('/', validateBody(createRentalSchema), RentalController.create);
router.get('/', RentalController.listAll);
router.get('/:id', RentalController.getById);
router.patch('/:id/cancel', RentalController.cancel);
router.patch('/:id/finish', RentalController.finish);

export default router;