import { RentalRepository } from '../repositories/rentalRepository.js';
import { VehicleRepository } from '../repositories/vehicleRepository.js';
import { ClientRepository } from '../repositories/clientRepository.js';
import { PaymentRepository } from '../repositories/paymentRepository.js';
import { Rental } from '../models/Rental.js';
import { RentalStatus, VehicleStatus, PaymentStatus } from '../models/Enums.js';

export class RentalService {
  static async create({ clientId, vehicleId, startDate, endDate }) {

    const client = await ClientRepository.findById(clientId);
    if (!client) {
      const error = new Error('Cliente informado não existe.');
      error.statusCode = 404;
      throw error;
    }

    if (!client.isAdult()) {
      const error = new Error('Cliente deve ter 18 anos ou mais para alugar.');
      error.statusCode = 400;
      throw error;
    }

    const vehicle = await VehicleRepository.findById(vehicleId);
    if (!vehicle) {
      const error = new Error('Veículo informado não existe.');
      error.statusCode = 404;
      throw error;
    }

    if (vehicle.status === VehicleStatus.INACTIVE) {
      const error = new Error('Veículos inativos não podem ser alugados.');
      error.statusCode = 400;
      throw error;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      const error = new Error('A data de início do aluguel deve ser anterior à data final.');
      error.statusCode = 400;
      throw error;
    }

    const hasOverlap = await RentalRepository.hasOverlappingRentals(vehicleId, start, end);
    if (hasOverlap) {
      const error = new Error('O veículo já possui um aluguel agendado para o período solicitado.');
      error.statusCode = 409;
      throw error;
    }

    const rental = new Rental({
      clientId,
      vehicleId,
      startDate: start,
      endDate: end,
      status: RentalStatus.ACTIVE
    });

    rental.calculateValue(vehicle.dailyRentValue);

    const createdRental = await RentalRepository.create(rental);

    await VehicleRepository.updateStatus(vehicleId, VehicleStatus.RENTED);

    return createdRental;
  }

  static async listAll() {
    return await RentalRepository.findAll();
  }

  static async getById(id) {
    const rental = await RentalRepository.findById(id);
    if (!rental) {
      const error = new Error('Aluguel não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return rental;
  }

  static async cancel(id) {
    const rental = await this.getById(id);

    if (rental.status !== RentalStatus.ACTIVE) {
      const error = new Error('Apenas aluguéis ativos podem ser cancelados.');
      error.statusCode = 400;
      throw error;
    }

    rental.cancel();
    await RentalRepository.updateStatus(id, rental.status);

    await VehicleRepository.updateStatus(rental.vehicleId, VehicleStatus.AVAILABLE);

    const payment = await PaymentRepository.findByRentalId(id);
    if (payment && payment.status === PaymentStatus.PAID) {
      await PaymentRepository.updateStatus(payment.id, PaymentStatus.REFUND);
    }

    return rental;
  }

  static async finish(id) {
    const rental = await this.getById(id);

    if (rental.status !== RentalStatus.ACTIVE) {
      const error = new Error('Apenas aluguéis ativos podem ser finalizados.');
      error.statusCode = 400;
      throw error;
    }

    rental.finish();
    await RentalRepository.updateStatus(id, rental.status);

    // Libera o veículo
    await VehicleRepository.updateStatus(rental.vehicleId, VehicleStatus.AVAILABLE);

    return rental;
  }
}