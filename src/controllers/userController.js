import { UserService } from '../services/userService.js';

export class UserController {
  static async create(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Usuário cadastrado com sucesso!',
        data: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    } catch (error) {
      next(error);
    }
  }

  static async listAll(req, res, next) {
    try {
      const users = await UserService.listAll();
      const safeUsers = users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt }));
      return res.status(200).json({ status: 'success', data: safeUsers });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await UserService.getById(Number(req.params.id));
      return res.status(200).json({
        status: 'success',
        data: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const updatedUser = await UserService.update(Number(req.params.id), req.body);
      return res.status(200).json({
        status: 'success',
        message: 'Usuário atualizado com sucesso!',
        data: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role }
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await UserService.delete(Number(req.params.id));
      return res.status(200).json({ status: 'success', message: 'Usuário removido com sucesso!' });
    } catch (error) {
      next(error);
    }
  }
}