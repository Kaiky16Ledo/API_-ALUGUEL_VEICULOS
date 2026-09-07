
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'EMPLOYEE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    birth_date DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    color VARCHAR(30) NOT NULL,
    year INT NOT NULL,
    plate VARCHAR(10) UNIQUE NOT NULL,
    daily_rent_value NUMERIC(10, 2) NOT NULL CHECK (daily_rent_value > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'RENTED', 'INACTIVE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rentals (
    rent_id SERIAL PRIMARY KEY,
    client_id INT NOT NULL REFERENCES clients(client_id) ON DELETE RESTRICT,
    vehicle_id INT NOT NULL REFERENCES vehicles(vehicle_id) ON DELETE RESTRICT,
    rental_days INT NOT NULL CHECK (rental_days > 0),
    total_value NUMERIC(10, 2) NOT NULL CHECK (total_value > 0),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'FINISHED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    rental_id INT UNIQUE NOT NULL REFERENCES rentals(rent_id) ON DELETE RESTRICT,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PAID' CHECK (payment_status IN ('PAID', 'REFUND')),
    payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password_hash, role) VALUES
('Administrador', 'admin@locadora.com', '$2a$10$w09ZJ8K5N82.oUqS.T6l9.tWdK9b6tX9V0b7lXW3M0Q3oP0l8r0.G', 'ADMIN'),
('Funcionario Padrao', 'funcionario@locadora.com', '$2a$10$w09ZJ8K5N82.oUqS.T6l9.tWdK9b6tX9V0b7lXW3M0Q3oP0l8r0.G', 'EMPLOYEE')
ON CONFLICT (email) DO NOTHING;

INSERT INTO clients (name, cpf, birth_date, address, email, phone, city, state) VALUES
('Carlos Eduardo Silva', '123.456.789-00', '1990-05-15', 'Av. Paulista, 1000', 'carlos.silva@email.com', '(11) 98765-4321', 'São Paulo', 'SP'),
('Mariana Souza Lima', '987.654.321-99', '1998-10-22', 'Rua das Flores, 123', 'mariana.souza@email.com', '(21) 99887-6655', 'Rio de Janeiro', 'RJ'),
('Mário Souza Lima', '987.654.321-00', '2014-12-22', 'Rua das Flores, 123', 'mario.souza@email.com', '(21) 99887-6655', 'Rio de Janeiro', 'RJ')

ON CONFLICT (cpf) DO NOTHING;

INSERT INTO vehicles (brand, model, color, year, plate, daily_rent_value, status) VALUES
('Toyota', 'Corolla', 'Prata', 2023, 'BRA2E19', 150.00, 'AVAILABLE'),
('Honda', 'Civic', 'Preto', 2022, 'RIO1A23', 160.00, 'AVAILABLE'),
('Volkswagen', 'Gol 1.0', 'Branco', 2021, 'ABC1234', 90.00, 'RENTED'),
('Jeep', 'Renegade', 'Vermelho', 2024, 'XYZ9876', 200.00, 'INACTIVE')
ON CONFLICT (plate) DO NOTHING;

INSERT INTO rentals (client_id, vehicle_id, rental_days, total_value, start_date, end_date, status) VALUES
(1, 3, 3, 270.00, CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP + INTERVAL '2 days', 'ACTIVE')
ON CONFLICT DO NOTHING;

INSERT INTO payments (rental_id, amount, payment_method, payment_status, payment_date) VALUES
(1, 270.00, 'CREDIT_CARD', 'PAID', CURRENT_TIMESTAMP - INTERVAL '1 day')
ON CONFLICT DO NOTHING;