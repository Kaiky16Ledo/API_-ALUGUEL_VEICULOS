import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
});

export const createUserSchema = z.object({
  name: z.string().min(2, 'O nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  role: z.enum(['ADMIN', 'EMPLOYEE']).optional()
});

export const createClientSchema = z.object({
  name: z.string().min(2, 'O nome é obrigatório'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/, 'CPF inválido (use 000.000.000-00 ou 11 dígitos)'),
  birthDate: z.string().refine(val => !isNaN(Date.parse(val)), 'Data de nascimento inválida (use AAAA-MM-DD)'),
  address: z.string().min(3, 'Endereço obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(8, 'Telefone obrigatório'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().length(2, 'Estado deve conter 2 letras (ex: SP)')
});

export const updateClientSchema = z.object({
  name: z.string().min(2).optional(),
  address: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8).optional(),
  city: z.string().min(2).optional(),
  state: z.string().length(2).optional()
});

export const createVehicleSchema = z.object({
  brand: z.string().min(1, 'Marca é obrigatória'),
  model: z.string().min(1, 'Modelo é obrigatório'),
  color: z.string().min(1, 'Cor é obrigatória'),
  year: z.number().int().min(1900, 'Ano inválido'),
  plate: z.string().min(7, 'Placa inválida'),
  dailyRentValue: z.number().positive('O valor da diária deve ser maior que zero')
});

export const updateVehicleSchema = createVehicleSchema.partial();

export const createRentalSchema = z.object({
  clientId: z.number().int().positive('ID do cliente inválido'),
  vehicleId: z.number().int().positive('ID do veículo inválido'),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), 'Data inicial inválida (use ISO ou AAAA-MM-DD)'),
  endDate: z.string().refine(val => !isNaN(Date.parse(val)), 'Data final inválida (use ISO ou AAAA-MM-DD)')
});

export const createPaymentSchema = z.object({
  rentalId: z.number().int().positive('ID do aluguel inválido'),
  amount: z.number().positive('O valor pago deve ser maior que zero').optional(),
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'CASH'], {
    errorMap: () => ({ message: 'Método de pagamento deve ser CREDIT_CARD, DEBIT_CARD, PIX ou CASH' })
  }),
  paymentDate: z.string().refine(val => !isNaN(Date.parse(val)), 'Data de pagamento inválida').optional()
});