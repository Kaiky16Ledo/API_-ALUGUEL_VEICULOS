import { PaymentStatus } from './Enums.js';

export class Payment {
  constructor({ id, rentalId, amount, paymentMethod, status, paymentDate, createdAt }) {
    this.id = id;
    this.rentalId = rentalId;
    this.amount = Number(amount);
    this.paymentMethod = paymentMethod;
    this.status = status || PaymentStatus.PAID;
    this.paymentDate = paymentDate ? new Date(paymentDate) : new Date();
    this.createdAt = createdAt || new Date();
  }

  confirm() {
    this.status = PaymentStatus.PAID;
  }

  refund() {
    this.status = PaymentStatus.REFUND;
  }
}