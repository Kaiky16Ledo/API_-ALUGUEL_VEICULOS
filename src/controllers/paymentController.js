import { PaymentService } from '../services/paymentService.js';

export class PaymentController {
  static async create(req, res, next) {
    try {
      const payment = await PaymentService.create(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Pagamento registrado com sucesso!',
        data: payment
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAll(req, res, next) {
    try {
      const payments = await PaymentService.listAll();
      return res.status(200).json({ status: 'success', data: payments });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const payment = await PaymentService.getById(Number(req.params.id));
      return res.status(200).json({ status: 'success', data: payment });
    } catch (error) {
      next(error);
    }
  }

  static async refund(req, res, next) {
    try {
      const payment = await PaymentService.refund(Number(req.params.id));
      return res.status(200).json({
        status: 'success',
        message: 'Pagamento estornado com sucesso!',
        data: payment
      });
    } catch (error) {
      next(error);
    }
  }
}