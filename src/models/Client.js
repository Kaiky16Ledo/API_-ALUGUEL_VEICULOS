export class Client {
  constructor({ id, name, cpf, birthDate, address, email, phone, city, state, createdAt }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.birthDate = new Date(birthDate);
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.state = state;
    this.createdAt = createdAt || new Date();
  }

  isAdult() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }

  update(data) {
    if (data.name) this.name = data.name;
    if (data.address) this.address = data.address;
    if (data.email) this.email = data.email;
    if (data.phone) this.phone = data.phone;
    if (data.city) this.city = data.city;
    if (data.state) this.state = data.state;
  }
}