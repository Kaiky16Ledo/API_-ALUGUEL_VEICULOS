import { query } from '../config/db.js';
import { Vehicle } from '../models/Vehicle.js';

export class VehicleRepository {
  static mapToEntity(row) {
    if (!row) return null;
    return new Vehicle({
      id: row.vehicle_id,
      brand: row.brand,
      model: row.model,
      color: row.color,
      year: row.year,
      plate: row.plate,
      dailyRentValue: row.daily_rent_value,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }

  static async findByPlate(plate) {
    const res = await query('SELECT * FROM vehicles WHERE plate = $1', [plate]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findById(id) {
    const res = await query('SELECT * FROM vehicles WHERE vehicle_id = $1', [id]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findAll() {
    const res = await query('SELECT * FROM vehicles ORDER BY vehicle_id ASC');
    return res.rows.map(row => this.mapToEntity(row));
  }

  static async create(vehicle) {
    const res = await query(
      `INSERT INTO vehicles (brand, model, color, year, plate, daily_rent_value, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [vehicle.brand, vehicle.model, vehicle.color, vehicle.year, vehicle.plate, vehicle.dailyRentValue, vehicle.status]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async update(id, vehicle) {
    const res = await query(
      `UPDATE vehicles 
       SET brand = $1, model = $2, color = $3, year = $4, daily_rent_value = $5, updated_at = CURRENT_TIMESTAMP 
       WHERE vehicle_id = $6 
       RETURNING *`,
      [vehicle.brand, vehicle.model, vehicle.color, vehicle.year, vehicle.dailyRentValue, id]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async updateStatus(id, status) {
    const res = await query(
      `UPDATE vehicles SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE vehicle_id = $2 RETURNING *`,
      [status, id]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async hasActiveRentals(vehicleId) {
    const res = await query(
      `SELECT 1 FROM rentals WHERE vehicle_id = $1 AND status = 'ACTIVE' LIMIT 1`,
      [vehicleId]
    );
    return res.rowCount > 0;
  }

  static async delete(id) {
    const res = await query('DELETE FROM vehicles WHERE vehicle_id = $1 RETURNING vehicle_id', [id]);
    return res.rowCount > 0;
  }
}