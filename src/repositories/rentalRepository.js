import { query } from '../config/db.js';
import { Rental } from '../models/Rental.js';

export class RentalRepository {
  static mapToEntity(row) {
    if (!row) return null;
    return new Rental({
      id: row.rent_id,
      clientId: row.client_id,
      vehicleId: row.vehicle_id,
      rentalDays: row.rental_days,
      totalValue: row.total_value,
      startDate: row.start_date,
      endDate: row.end_date,
      status: row.status,
      createdAt: row.created_at
    });
  }

  static async findById(id) {
    const res = await query('SELECT * FROM rentals WHERE rent_id = $1', [id]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findAll() {
    const res = await query('SELECT * FROM rentals ORDER BY rent_id DESC');
    return res.rows.map(row => this.mapToEntity(row));
  }

  static async hasOverlappingRentals(vehicleId, startDate, endDate, excludeRentalId = null) {
    let sql = `
      SELECT 1 FROM rentals 
      WHERE vehicle_id = $1 
        AND status = 'ACTIVE'
        AND (start_date, end_date) OVERLAPS ($2::timestamptz, $3::timestamptz)
    `;
    const params = [vehicleId, startDate, endDate];

    if (excludeRentalId) {
      sql += ' AND rent_id != $4';
      params.push(excludeRentalId);
    }

    const res = await query(sql, params);
    return res.rowCount > 0;
  }

  static async create(rental) {
    const res = await query(
      `INSERT INTO rentals (client_id, vehicle_id, rental_days, total_value, start_date, end_date, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [rental.clientId, rental.vehicleId, rental.rentalDays, rental.totalValue, rental.startDate, rental.endDate, rental.status]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async updateStatus(id, status) {
    const res = await query(
      `UPDATE rentals SET status = $1 WHERE rent_id = $2 RETURNING *`,
      [status, id]
    );
    return this.mapToEntity(res.rows[0]);
  }
}