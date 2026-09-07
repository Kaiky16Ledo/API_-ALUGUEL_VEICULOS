import { PaymentRepository } from '../repositories/paymentRepository.js';
import { RentalRepository } from '../repositories/rentalRepository.js';
import { Payment } from '../models/Payment.js';
import { PaymentStatus, RentalStatus } from '../models/Enums.js';

export class PaymentService {
  static async create({ rentalId, amount, paymentMethod, paymentDate }) {
    const rental = await RentalRepository.findById(rentalId);
    if (!rental) {
      const error = new Error('Aluguel informado não existe.');
      error.statusCode = 404;
      throw error;
    }

    const existingPayment = await PaymentRepository.findByRentalId(rentalId);
    if (existingPayment) {
      const error = new Error('Este aluguel já possui um pagamento registrado.');
      error.statusCode = 409;
      throw error;
    }

    const payDate = paymentDate ? new Date(paymentDate) : new Date();

    if (payDate > rental.startDate) {
      const error = new Error('O pagamento deve ocorrer antes ou na data de início do aluguel.');
      error.statusCode = 400;
      throw error;
    }

    const payment = new Payment({
      rentalId,
      amount: amount || rental.totalValue,
      paymentMethod,
      paymentDate: payDate,
      status: PaymentStatus.PAID
    });

    return await PaymentRepository.create(payment);
  }

  static async listAll() {
    return await PaymentRepository.findAll();
  }

  static async getById(id) {
    const payment = await PaymentRepository.findById(id);
    if (!payment) {
      const error = new Error('Pagamento não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return payment;
  }

  static async refund(id) {
    const payment = await this.getById(id);
    payment.refund();
    return await PaymentRepository.updateStatus(id, PaymentStatus.REFUND);
  }
}