import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { createPaymentSchema } from '../models/schemas.js';

const router = Router();

router.use(authenticateToken);

router.post('/', validateBody(createPaymentSchema), PaymentController.create);
router.get('/', PaymentController.listAll);
router.get('/:id', PaymentController.getById);
router.patch('/:id/refund', PaymentController.refund);

export default router;