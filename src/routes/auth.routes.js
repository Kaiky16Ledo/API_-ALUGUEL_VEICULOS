import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { loginSchema } from '../models/schemas.js';

const router = Router();

router.post('/login', validateBody(loginSchema), AuthController.login);

export default router;