import { VehicleRepository } from '../repositories/vehicleRepository.js';
import { Vehicle } from '../models/Vehicle.js';
import { VehicleStatus } from '../models/Enums.js';

export class VehicleService {
  static async create(data) {
    const existingVehicle = await VehicleRepository.findByPlate(data.plate);
    if (existingVehicle) {
      const error = new Error('Já existe um veículo cadastrado com esta placa.');
      error.statusCode = 409;
      throw error;
    }

    const currentYear = new Date().getFullYear();
    if (data.year > currentYear) {
      const error = new Error('O ano do veículo não pode ser superior ao ano atual.');
      error.statusCode = 400;
      throw error;
    }

    if (data.dailyRentValue <= 0) {
      const error = new Error('O valor da diária deve ser maior que zero.');
      error.statusCode = 400;
      throw error;
    }

    const vehicle = new Vehicle(data);
    return await VehicleRepository.create(vehicle);
  }

  static async listAll() {
    return await VehicleRepository.findAll();
  }

  static async getById(id) {
    const vehicle = await VehicleRepository.findById(id);
    if (!vehicle) {
      const error = new Error('Veículo não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return vehicle;
  }

  static async getByPlate(plate) {
    const vehicle = await VehicleRepository.findByPlate(plate);
    if (!vehicle) {
      const error = new Error('Veículo não encontrado com a placa informada.');
      error.statusCode = 404;
      throw error;
    }
    return vehicle;
  }

  static async update(id, data) {
    await this.getById(id);
    return await VehicleRepository.update(id, data);
  }

  static async delete(id) {
    await this.getById(id);

    const hasActiveRentals = await VehicleRepository.hasActiveRentals(id);
    if (hasActiveRentals) {
      const error = new Error('Não é possível remover veículo com aluguel ativo vinculado.');
      error.statusCode = 400;
      throw error;
    }

    return await VehicleRepository.delete(id);
  }
}