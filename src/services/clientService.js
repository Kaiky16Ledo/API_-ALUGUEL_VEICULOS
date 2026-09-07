import { ClientRepository } from '../repositories/clientRepository.js';
import { Client } from '../models/Client.js';

export class ClientService {
  static async create(data) {
    const existingClient = await ClientRepository.findByCpf(data.cpf);
    if (existingClient) {
      const error = new Error('Já existe um cliente cadastrado com este CPF.');
      error.statusCode = 409;
      throw error;
    }

    const birthDate = new Date(data.birthDate);
    if (birthDate > new Date()) {
      const error = new Error('A data de nascimento não pode ser uma data futura.');
      error.statusCode = 400;
      throw error;
    }

    const client = new Client(data);

    if (!client.isAdult()) {
      const error = new Error('O cliente deve possuir idade igual ou superior a 18 anos.');
      error.statusCode = 400;
      throw error;
    }

    return await ClientRepository.create(client);
  }

  static async listAll() {
    return await ClientRepository.findAll();
  }

  static async getById(id) {
    const client = await ClientRepository.findById(id);
    if (!client) {
      const error = new Error('Cliente não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return client;
  }

  static async update(id, data) {
    const client = await this.getById(id);
    client.update(data);
    return await ClientRepository.update(id, client);
  }

  static async delete(id) {
    await this.getById(id);

    const hasActiveRentals = await ClientRepository.hasActiveRentals(id);
    if (hasActiveRentals) {
      const error = new Error('Não é possível remover cliente com aluguel ativo.');
      error.statusCode = 400;
      throw error;
    }

    return await ClientRepository.delete(id);
  }
}