import { query } from '../config/db.js';
import { User } from '../models/User.js';

export class UserRepository {
  static mapToEntity(row) {
    if (!row) return null;
    return new User({
      id: row.user_id,
      name: row.name,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }

  static async findByEmail(email) {
    const res = await query('SELECT * FROM users WHERE email = $1', [email]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findById(id) {
    const res = await query('SELECT * FROM users WHERE user_id = $1', [id]);
    return this.mapToEntity(res.rows[0]);
  }

  static async findAll() {
    const res = await query('SELECT * FROM users ORDER BY user_id ASC');
    return res.rows.map(row => this.mapToEntity(row));
  }

  static async create(user) {
    const res = await query(
      `INSERT INTO users (name, email, password_hash, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [user.name, user.email, user.passwordHash, user.role]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async update(id, { name, role }) {
    const res = await query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           role = COALESCE($2, role), 
           updated_at = CURRENT_TIMESTAMP 
       WHERE user_id = $3 
       RETURNING *`,
      [name, role, id]
    );
    return this.mapToEntity(res.rows[0]);
  }

  static async delete(id) {
    const res = await query('DELETE FROM users WHERE user_id = $1 RETURNING user_id', [id]);
    return res.rowCount > 0;
  }
}