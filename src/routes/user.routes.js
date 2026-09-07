import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { createUserSchema } from '../models/schemas.js';

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles('ADMIN'));

router.post('/', validateBody(createUserSchema), UserController.create);
router.get('/', UserController.listAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;