import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import clientRoutes from './client.routes.js';
import vehicleRoutes from './vehicle.routes.js';
import rentalRoutes from './rental.routes.js';
import paymentRoutes from './payment.routes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/clients', clientRoutes);
apiRouter.use('/vehicles', vehicleRoutes);
apiRouter.use('/rentals', rentalRoutes);
apiRouter.use('/payments', paymentRoutes);

export default apiRouter;