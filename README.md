# Basic E-Commerce Project
## Stack: Spring Boot + MySQL + React

---

## BACKEND SETUP

### 1. MySQL
```sql
-- Open MySQL and run:
CREATE DATABASE ecommerce_db;
-- Then run schema.sql (optional, JPA auto-creates tables)
```

### 2. Update DB password
Edit: `backend/src/main/resources/application.properties`
```
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Run Spring Boot
```bash
cd backend
mvn spring-boot:run
```
Backend runs at: http://localhost:8081

---

## FRONTEND SETUP

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Start React
```bash
npm start
```
Frontend runs at: http://localhost:3000

---

## API ENDPOINTS (test with Postman)

### Users
| Method | URL | Body |
|--------|-----|------|
| POST | /users/register | `{"name":"Manas","email":"m@m.com","password":"123"}` |
| POST | /users/login | `{"email":"m@m.com","password":"123"}` |

### Products
| Method | URL | Body |
|--------|-----|------|
| GET | /products | — |
| POST | /products | `{"name":"Laptop","price":45000,"quantity":10}` |
| PUT | /products/{id} | `{"name":"Laptop Pro","price":50000,"quantity":8}` |
| DELETE | /products/{id} | — |

### Orders
| Method | URL | Body |
|--------|-----|------|
| POST | /orders | `{"userId":1,"productId":1,"quantity":2}` |
| GET | /orders | — |

---

## VIVA EXPLANATION (say this)
> "User registers/logs in → their info is stored in MySQL users table.
> Admin adds products → stored in products table.
> User places an order → order is saved in orders table with user_id and product_id as foreign keys, and stock is reduced automatically.
> React frontend calls these APIs using Axios and displays the data using useState and useEffect."

---

## PROJECT STRUCTURE
```
ecommerce-project/
├── backend/
│   └── src/main/java/com/ecommerce/
│       ├── entity/        → User, Product, Order
│       ├── repository/    → JPA interfaces
│       ├── service/       → Business logic
│       └── controller/    → REST APIs
├── frontend/
│   └── src/
│       ├── pages/         → Login, Register, Products, Orders
│       ├── components/    → Navbar
│       └── services/      → api.js (all Axios calls)
└── schema.sql
```
