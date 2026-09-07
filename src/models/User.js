import bcrypt from 'bcryptjs';

export class User {
  constructor({ id, name, email, passwordHash, role, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  async authenticate(plainPassword) {
    if (!this.passwordHash) return false;
    return bcrypt.compareSync(plainPassword, this.passwordHash);
  }

  async changePassword(newPlainPassword) {
    this.passwordHash = bcrypt.hashSync(newPlainPassword, 10);
    this.updatedAt = new Date();
  }
}