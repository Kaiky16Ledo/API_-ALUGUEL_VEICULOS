import { VehicleStatus } from './Enums.js';

export class Vehicle {
  constructor({ id, brand, model, color, year, plate, dailyRentValue, status, createdAt, updatedAt }) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.year = year;
    this.plate = plate;
    this.dailyRentValue = Number(dailyRentValue);
    this.status = status || VehicleStatus.AVAILABLE;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  isAvailable() {
    return this.status === VehicleStatus.AVAILABLE;
  }

  changeStatus(newStatus) {
    if (!Object.values(VehicleStatus).includes(newStatus)) {
      throw new Error(`Status inválido: ${newStatus}`);
    }
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  activate() {
    this.changeStatus(VehicleStatus.AVAILABLE);
  }

  deactivate() {
    this.changeStatus(VehicleStatus.INACTIVE);
  }
}