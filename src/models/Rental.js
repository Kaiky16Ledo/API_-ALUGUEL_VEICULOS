import { RentalStatus } from './Enums.js';

export class Rental {
  constructor({ id, clientId, vehicleId, rentalDays, totalValue, startDate, endDate, status, createdAt }) {
    this.id = id;
    this.clientId = clientId;
    this.vehicleId = vehicleId;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.status = status || RentalStatus.ACTIVE;
    this.createdAt = createdAt || new Date();

    this.rentalDays = rentalDays || this._calculateDays();
    this.totalValue = totalValue ? Number(totalValue) : 0;
  }

  _calculateDays() {
    const diffTime = Math.abs(this.endDate - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }

  calculateValue(dailyRentValue) {
    this.totalValue = Number((this.rentalDays * dailyRentValue).toFixed(2));
    return this.totalValue;
  }

  cancel() {
    this.status = RentalStatus.CANCELLED;
  }

  finish() {
    this.status = RentalStatus.FINISHED;
  }
}