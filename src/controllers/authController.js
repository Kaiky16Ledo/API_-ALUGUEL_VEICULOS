import { AuthService } from '../services/authService.js';

export class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return res.status(200).json({
        status: 'success',
        message: 'Login realizado com sucesso!',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}