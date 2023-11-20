# Car Management WebAPI

This project is a Node.js WebAPI for managing cars, drivers, and car usage within a company.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
    - [Car Endpoints](#car-endpoints)
    - [Driver Endpoints](#driver-endpoints)
    - [Car Usage Endpoints](#car-usage-endpoints)
- [Testing](#testing)

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eduassumpcao/desafio-tecnico.git
2. Install Dependencies:
    ```bash
    cd desafio-tecnico
    npm install
    ```
3. Run the application:
    ```
    npm start
    ```

## Usage

### Endpoints
#### Car Endpoints

- Create a new car:
    - Endpoint: POST /api/v1/cars
    - Request Body: JSON with plate, color, and brand.
    - Example: { "plate": "ABC1234", "color": "Red", "brand": "Toyota" }

- Update an existing car:
    - Endpoint: PUT /api/v1/cars/:id
    - Request Body: JSON with updated information.
    - Example: { "color": "Blue" }
- Delete a car:
    - Endpoint: DELETE /cars/:id

- Get a car by ID:
    - Endpoint: GET /api/v1/cars/:id

- List cars with optional filters:
    - Endpoint: GET /api/v1/cars
    - Query Parameters: color, brand

#### Driver Endpoints
- Create a new driver:
    - Endpoint: POST /api/v1/drivers
    - Request Body: JSON with name.
    - Example: { "name": "Eduardo" }

- Update an existing driver:
    - Endpoint: PUT /api/v1/drivers/:id
    - Request Body: JSON with updated information.
    - Example: { "name": "Eduardo A." }

- Delete a driver:
    - Endpoint: DELETE /api/v1/drivers/:id

- Get a driver by ID:
    - Endpoint: GET /api/v1/drivers/:id

- List drivers with optional filter:
    - Endpoint: GET /api/v1/drivers
    - Query Parameter: name

#### Car Usage Endpoints

- Start car usage by a driver:
    - Endpoint: POST /api/v1/car-usage/start
    - Request Body: JSON with driverId, carId, startDate, and reason.
    - Example: { "driverId": "someUUID", "carId": "someUUID", "startDate": "TIMESTAMP", "reason": "Business Trip" }

- Finish car usage by a driver:
    - Endpoint: PUT /api/v1/car-usage/finish/:id
    - Request Body: JSON with carUsageId and endDate.
    - Example: { "endDate": "TIMESTAMP" }

- Get a car usage by ID:
    - Endpoint: GET /api/v1/car-usage/:id

- List car usage records with driver and car details:
    - Endpoint: GET /api/v1/car-usage

## Testing
```bash
npm test
```
