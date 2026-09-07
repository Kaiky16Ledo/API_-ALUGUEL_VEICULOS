import { query } from '../config/db.js';
import { Client } from '../models/Client.js';

export class ClientRepository {
  static mapToEntity(row) {
    if (!row) return null;
    return new Client({
      id: row.client_id,
      name: row.name,
      cpf: row.cpf,
      birthDate: row.birth_date,
      address: row.address,
      email: row.email,
      phone: row.phone,
      city: row.city,
      state: row.state,
      createdAt: row.created_at
    });
  }

  static async findByCpf(cpf) {
    const res = await query('SELECT * FROM clients WHERE cpf = $1', [cpf]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findById(id) {
    const res = await query('SELECT * FROM clients WHERE client_id = $1', [id]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findAll() {
    const res = await query('SELECT * FROM clients ORDER BY client_id ASC');
    return res.rows.map(row => this.mapToEntity(row));
  }

  static async create(client) {
    const res = await query(
      `INSERT INTO clients (name, cpf, birth_date, address, email, phone, city, state) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [client.name, client.cpf, client.birthDate, client.address, client.email, client.phone, client.city, client.state]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async update(id, client) {
    const res = await query(
      `UPDATE clients 
       SET name = $1, address = $2, email = $3, phone = $4, city = $5, state = $6 
       WHERE client_id = $7 
       RETURNING *`,
      [client.name, client.address, client.email, client.phone, client.city, client.state, id]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async hasActiveRentals(clientId) {
    const res = await query(
      `SELECT 1 FROM rentals WHERE client_id = $1 AND status = 'ACTIVE' LIMIT 1`,
      [clientId]
    );
    return res.rowCount > 0;
  }

  static async delete(id) {
    const res = await query('DELETE FROM clients WHERE client_id = $1 RETURNING client_id', [id]);
    return res.rowCount > 0;
  }
}