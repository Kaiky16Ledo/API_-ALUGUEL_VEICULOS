import { RentalService } from '../services/rentalService.js';

export class RentalController {
  static async create(req, res, next) {
    try {
      const rental = await RentalService.create(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Aluguel registrado com sucesso!',
        data: rental
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAll(req, res, next) {
    try {
      const rentals = await RentalService.listAll();
      return res.status(200).json({ status: 'success', data: rentals });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const rental = await RentalService.getById(Number(req.params.id));
      return res.status(200).json({ status: 'success', data: rental });
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req, res, next) {
    try {
      const rental = await RentalService.cancel(Number(req.params.id));
      return res.status(200).json({
        status: 'success',
        message: 'Aluguel cancelado com sucesso e status atualizados!',
        data: rental
      });
    } catch (error) {
      next(error);
    }
  }

  static async finish(req, res, next) {
    try {
      const rental = await RentalService.finish(Number(req.params.id));
      return res.status(200).json({
        status: 'success',
        message: 'Aluguel finalizado com sucesso e veículo liberado!',
        data: rental
      });
    } catch (error) {
      next(error);
    }
  }
}