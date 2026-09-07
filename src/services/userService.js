import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/userRepository.js';
import { User } from '../models/User.js';

export class UserService {
  static async create({ name, email, password, role }) {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error('Já existe um usuário cadastrado com este e-mail.');
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const user = new User({
      name,
      email,
      passwordHash,
      role: role || 'EMPLOYEE'
    });

    return await UserRepository.create(user);
  }

  static async listAll() {
    return await UserRepository.findAll();
  }

  static async getById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      const error = new Error('Usuário não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  static async update(id, data) {
    await this.getById(id);
    return await UserRepository.update(id, data);
  }

  static async delete(id) {
    await this.getById(id);
    return await UserRepository.delete(id);
  }
}