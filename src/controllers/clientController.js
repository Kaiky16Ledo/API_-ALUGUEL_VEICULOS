import { ClientService } from '../services/clientService.js';

export class ClientController {
  static async create(req, res, next) {
    try {
      const client = await ClientService.create(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Cliente cadastrado com sucesso!',
        data: client
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAll(req, res, next) {
    try {
      const clients = await ClientService.listAll();
      return res.status(200).json({ status: 'success', data: clients });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const client = await ClientService.getById(Number(req.params.id));
      return res.status(200).json({ status: 'success', data: client });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const updatedClient = await ClientService.update(Number(req.params.id), req.body);
      return res.status(200).json({
        status: 'success',
        message: 'Cliente atualizado com sucesso!',
        data: updatedClient
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await ClientService.delete(Number(req.params.id));
      return res.status(200).json({ status: 'success', message: 'Cliente removido com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}