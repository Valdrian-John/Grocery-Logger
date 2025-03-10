# Grocery-Logger

**Before setting up the project, ensure you have the following installed on your system:**

· [Node.js](https://nodejs.org/en) (LTS recommended)

· [XAMPP](https://www.apachefriends.org) (to run MySQL)

· [npm](https://www.npmjs.com) (comes with Node.js)

· [Postman](https://www.postman.com) (optional, for testing API endpoints)

**Required Dependencies (Backend)**

· `express` - Web framework for Node.js

· `Mysql` - MySQL database driver

· `cors` - Enables Cross-Origin Resource Sharing

· `dotenv` - Loads environment variables from a `.env` file

· `nodemon` (optional) - Automatically restarts the server on file changes (install globally with `npm install -g nodemon`)

**Backend Setup**

```sh
$ cd backend
```

**Install dependencies**

```sh
npm install
```

## 🛠 Setup the MySQL Database Environment using XAMPP

1. Open **phpMyAdmin** in your browser (`localhost/phpmyadmin`).
2. Create a new database:  

   ```sql
   CREATE DATABASE grocery_db;
   ```

3. Select the **grocery_db** database and create the `grocery_items` table:

   ```sql
   CREATE TABLE grocery_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

   Insert Sample Data:
   
   INSERT INTO grocery_items (name, price) VALUES
   ('Pork Meat', 250),
   ('Fish Meat', 300),
   ('Milk', 90);
   ```

## Summary of API Endpoints

| Method  | Endpoint      | Description                    |
|---------|-------------|--------------------------------|
| **GET**     | `/api/items`        | Retrieve all grocery items      |
| **POST**    | `/api/items`        | Create a new grocery item       |
| **PUT**     | `/api/items/:id`    | Update a grocery item by ID     |
| **DELETE**  | `/api/items/:id`    | Delete a grocery item by ID     |
