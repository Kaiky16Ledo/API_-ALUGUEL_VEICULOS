import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository.js';

export class AuthService {
  static async login(email, password) {
    // 1. Busca usuário por email
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      const error = new Error('Credenciais inválidas.');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await user.authenticate(password);
    if (!isPasswordValid) {
      const error = new Error('Credenciais inválidas.');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}