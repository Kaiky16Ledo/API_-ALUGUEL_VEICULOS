import { ZodError } from 'zod';

export function errorHandler(err, req, res, next) {

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Dados inválidos na requisição.',
      errors: err.errors.map(e => ({
        campo: e.path.join('.'),
        mensagem: e.message
      }))
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor.';

  if (statusCode === 500) {
    console.error('💥 [Erro Inesperado]:', err);
  }

  return res.status(statusCode).json({
    status: 'error',
    message
  });
}