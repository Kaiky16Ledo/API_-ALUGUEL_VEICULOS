import { VehicleService } from '../services/vehicleService.js';

export class VehicleController {
  static async create(req, res, next) {
    try {
      const vehicle = await VehicleService.create(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Veículo cadastrado com sucesso!',
        data: vehicle
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAll(req, res, next) {
    try {
      const vehicles = await VehicleService.listAll();
      return res.status(200).json({ status: 'success', data: vehicles });
    } catch (error) {
      next(error);
    }
  }

  static async getByIdOrPlate(req, res, next) {
    try {
      const param = req.params.idOrPlate;
      // Se for número busca por ID, senão por Placa
      const isNumeric = /^\d+$/.test(param);
      const vehicle = isNumeric
        ? await VehicleService.getById(Number(param))
        : await VehicleService.getByPlate(param);

      return res.status(200).json({ status: 'success', data: vehicle });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const updatedVehicle = await VehicleService.update(Number(req.params.id), req.body);
      return res.status(200).json({
        status: 'success',
        message: 'Veículo atualizado com sucesso!',
        data: updatedVehicle
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await VehicleService.delete(Number(req.params.id));
      return res.status(200).json({ status: 'success', message: 'Veículo removido com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}