import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

async function runSeed() {
  console.log('🌱 Iniciando população do banco de dados (Seed)...');
  
  try {
    const passwordHash = await bcrypt.hash('admin123', 10);

    await pool.query(`
      INSERT INTO users (name, email, password_hash, role) VALUES
      ('Administrador', 'admin@locadora.com', $1, 'ADMIN'),
      ('Funcionario Padrao', 'funcionario@locadora.com', $1, 'EMPLOYEE')
      ON CONFLICT (email) DO NOTHING;
    `, [passwordHash]);

    await pool.query(`
      INSERT INTO clients (name, cpf, birth_date, address, email, phone, city, state) VALUES
      ('Carlos Eduardo Silva', '123.456.789-00', '1990-05-15', 'Av. Paulista, 1000', 'carlos.silva@email.com', '(11) 98765-4321', 'São Paulo', 'SP'),
      ('Mariana Souza Lima', '987.654.321-99', '1998-10-22', 'Rua das Flores, 123', 'mariana.souza@email.com', '(21) 99887-6655', 'Rio de Janeiro', 'RJ'),

      ON CONFLICT (cpf) DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO vehicles (brand, model, color, year, plate, daily_rent_value, status) VALUES
      ('Toyota', 'Corolla', 'Prata', 2023, 'BRA2E19', 150.00, 'AVAILABLE'),
      ('Honda', 'Civic', 'Preto', 2022, 'RIO1A23', 160.00, 'AVAILABLE'),
      ('Volkswagen', 'Gol 1.0', 'Branco', 2021, 'ABC1234', 90.00, 'RENTED'),
      ('Jeep', 'Renegade', 'Vermelho', 2024, 'XYZ9876', 200.00, 'INACTIVE')
      ON CONFLICT (plate) DO NOTHING;
    `);

    console.log('✅ Banco de dados populado com sucesso!');
    console.log('🔑 Usuário padrão: admin@locadora.com | Senha: admin123');
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
  } finally {
    await pool.end();
  }
}

runSeed();