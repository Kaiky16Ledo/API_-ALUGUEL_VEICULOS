import { query } from '../config/db.js';
import { Payment } from '../models/Payment.js';

export class PaymentRepository {
  static mapToEntity(row) {
    if (!row) return null;
    return new Payment({
      id: row.payment_id,
      rentalId: row.rental_id,
      amount: row.amount,
      paymentMethod: row.payment_method,
      status: row.payment_status,
      paymentDate: row.payment_date,
      createdAt: row.created_at
    });
  }

  static async findById(id) {
    const res = await query('SELECT * FROM payments WHERE payment_id = $1', [id]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findByRentalId(rentalId) {
    const res = await query('SELECT * FROM payments WHERE rental_id = $1', [rentalId]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findAll() {
    const res = await query('SELECT * FROM payments ORDER BY payment_id DESC');
    return res.rows.map(row => this.mapToEntity(row));
  }

  static async create(payment) {
    const res = await query(
      `INSERT INTO payments (rental_id, amount, payment_method, payment_status, payment_date) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [payment.rentalId, payment.amount, payment.paymentMethod, payment.status, payment.paymentDate]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async updateStatus(paymentId, status) {
    const res = await query(
      `UPDATE payments SET payment_status = $1 WHERE payment_id = $2 RETURNING *`,
      [status, paymentId]
    );
    return this.mapToEntity(res.rows[0]);
  }
}