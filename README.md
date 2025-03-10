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
## Summary of API Endpoints

| Method  | Endpoint      | Description                    |
|---------|-------------|--------------------------------|
| **GET**     | `/api/items`        | Retrieve all grocery items      |
| **POST**    | `/api/items`        | Create a new grocery item       |
| **PUT**     | `/api/items/:id`    | Update a grocery item by ID     |
| **DELETE**  | `/api/items/:id`    | Delete a grocery item by ID     |
