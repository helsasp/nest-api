# Food API

Simple backend REST API built with **NestJS** for managing users and food data. The API uses **PostgreSQL** as the SQL database, **Prisma ORM** for database access, and **JWT** for authentication.


---

## Requirements

This project fulfills the following requirements:

* Minimum 2 related CRUD operations
* SQL database using PostgreSQL
* JWT-based API authentication
* E2E testing for JWT authentication
* Modular project architecture

---

## Features

### Authentication

* User registration
* User login
* JWT access token generation
* JWT-protected API endpoints

### Food Management

* Create food
* Read foods
* Update food
* Delete food

Food data is associated with the authenticated user.

---

## Project Architecture

### Modular Architecture

This project uses **Modular Architecture** with separation of responsibilities between **Controller, Service, and ORM**.

The application is organized into feature-based modules:

```text
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── ...
│
├── food/
│   ├── food.module.ts
│   ├── food.controller.ts
│   ├── food.service.ts
│   └── ...
│
├── prisma/
│   └── ...
│
├── app.module.ts
└── main.ts
```

### Why Modular Architecture?

Modular Architecture is used because it:

* Organizes the application based on features.
* Separates responsibilities between components.
* Makes the code easier to maintain and modify.

---

## Database

The application uses **PostgreSQL** as the SQL database with **Prisma ORM**.

The main relationship is:

```text
User
 └── Food
```

One user can have multiple food records.

Database schema changes are managed using Prisma migrations.

```bash
npx prisma migrate dev
```

---

## API Endpoints


Base URL:

```text
http://localhost:3000
```

| Method | Endpoint         | Authentication | Description       |
| ------ | ---------------- | -------------- | ----------------- |
| POST   | `/auth/register` | No             | Register a user   |
| POST   | `/auth/login`    | No             | Login and get JWT |
| GET    | `/foods`         | JWT            | Get all foods     |
| POST   | `/foods`         | JWT            | Create a food     |
| PATCH  | `/foods/:id`     | JWT            | Update a food     |
| DELETE | `/foods/:id`     | JWT            | Delete a food     |

### Authentication

#### Register

```http
POST /auth/register
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /auth/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "access_token": "JWT_TOKEN"
}
```


---

## Food API

All food endpoints require JWT authentication.

### Get All Foods

```http
GET /foods
```

---

### Create Food

```http
POST /foods
```

Request body:

```json
{
  "name": "Fried Rice",
  "description": "Indonesian fried rice",
  "price": 25000,
  "category" : "Lunch"
}
```

---

### Update Food

```http
PATCH /foods/:id
```

Request body:

```json
{
  "name": "Special Fried Rice",
  "description": "Fried rice with egg and chicken",
  "price": 30000
  "category" : "Dinner"
}
```

---

### Delete Food

```http
DELETE /foods/:id
```
---

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/food_api"
JWT_SECRET="your-secret-key"
```

### 3. Run Database Migration

```bash
npx prisma migrate dev
```

### 4. Start the Application

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

---

## E2E Testing

The project includes **End-to-End (E2E) testing** using **Jest and Supertest**.

The E2E tests verify JWT authentication by testing:

1. User authentication.
2. JWT token generation.
3. Access to protected endpoints without a token.
4. Access to protected endpoints with a valid JWT token.

Run the E2E tests:

```bash
npm run test:e2e
```

---


## Summary

This project implements a simple authenticated REST API using:

**NestJS + PostgreSQL + Prisma + JWT**

The application provides user authentication and CRUD operations for food data. It follows **Modular Architecture** with separation of concerns between **Module, Controller, Service, and ORM**, and includes E2E testing to verify JWT-protected API access.
