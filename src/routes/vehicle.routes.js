import { Router } from 'express';
import { VehicleController } from '../controllers/vehicleController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { validateBody } from '../middlewares/validationMiddleware.js';
import { createVehicleSchema, updateVehicleSchema } from '../models/schemas.js';

const router = Router();

router.get('/', VehicleController.listAll);
router.get('/:idOrPlate', VehicleController.getByIdOrPlate);

router.use(authenticateToken);

router.post('/', validateBody(createVehicleSchema), VehicleController.create);
router.put('/:id', validateBody(updateVehicleSchema), VehicleController.update);

router.delete('/:id', authorizeRoles('ADMIN'), VehicleController.delete);

export default router;