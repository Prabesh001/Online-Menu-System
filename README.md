# TableMate

**TableMate** is an Online Menu System designed to enhance your restaurant experience by providing a digital interface for browsing menus and placing orders.

## 🚀 Features

- **Digital Menu Display**: Browse the restaurant's offerings through an interactive digital menu.
- **Order Placement**: Place orders directly through the system without the need for physical menus.
- **Responsive Design**: Accessible on various devices, ensuring a seamless experience on desktops, tablets, and smartphones.

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Backend**: Node.js with Express
- **Database**: MongoDB

## 📂 Project Structure

```
Online-Menu-System/
├── admin/          # Administrative interface for managing the menu and orders
├── backend/        # Backend server handling API requests and database interactions
└── frontend/       # Client-side interface for customers to view the menu and place orders
```

## 👥 Authors

- [Prabesh Dahal](https://github.com/Prabesh001)
- [Niraj Shrestha](https://github.com/Nirajstha0905)

## 🔧 Installation & Setup

To set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Prabesh001/Online-Menu-System.git
   ```
2. **Navigate to the backend directory**:
   ```bash
   cd Online-Menu-System/backend
   ```
3. **Install backend dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**: Create a `.env` file in the `backend` directory with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
5. **Start the backend server**:
   ```bash
   npm start
   ```
6. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```
7. **Open `index.html`** in your preferred browser to access the client interface.

*Note*: Ensure that MongoDB is running locally or provide a remote connection string in the `.env` file.


---

# 🍽️ Online Menu System – Backend API Documentation

## Overview

The **Online Menu System** backend provides RESTful APIs for managing restaurants, menus, categories, and items.  
Built with Node.js and Express, it utilizes MongoDB for data storage.  
The API supports CRUD operations, user authentication, and menu management functionalities.

---

## 📁 Authentication Endpoints

### 1. Register User

- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### 2. Login User

- **Endpoint:** `POST /auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "string"
  }
  ```

---

## 🏬 Restaurant Endpoints

### 1. Get All Restaurants

- **Endpoint:** `GET /restaurants`
- **Description:** Retrieves a list of all restaurants.
- **Response (200 OK):**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "location": "string",
      "isActive": true
    }
  ]
  ```

### 2. Get Restaurant by ID

- **Endpoint:** `GET /restaurants/{id}`
- **Description:** Retrieves details of a specific restaurant.
- **Parameters:**
  - `id` _(string, required)_: The ID of the restaurant.
- **Response (200 OK):**
  ```json
  {
    "id": "string",
    "name": "string",
    "location": "string",
    "isActive": true
  }
  ```

### 3. Create Restaurant

- **Endpoint:** `POST /restaurants`
- **Description:** Adds a new restaurant.
- **Request Body:**
  ```json
  {
    "name": "string",
    "location": "string"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "Restaurant created successfully",
    "restaurant": {
      "id": "string",
      "name": "string",
      "location": "string",
      "isActive": true
    }
  }
  ```

### 4. Update Restaurant

- **Endpoint:** `PUT /restaurants/{id}`
- **Description:** Updates details of an existing restaurant.
- **Parameters:**
  - `id` _(string, required)_: The ID of the restaurant.
- **Request Body:**
  ```json
  {
    "name": "string",
    "location": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Restaurant updated successfully",
    "restaurant": {
      "id": "string",
      "name": "string",
      "location": "string",
      "isActive": true
    }
  }
  ```

### 5. Delete Restaurant

- **Endpoint:** `DELETE /restaurants/{id}`
- **Description:** Deletes a restaurant.
- **Parameters:**
  - `id` _(string, required)_: The ID of the restaurant.
- **Response (200 OK):**
  ```json
  {
    "message": "Restaurant deleted successfully"
  }
  ```

---

## 📂 Category Endpoints

### 1. Get All Categories

- **Endpoint:** `GET /categories`
- **Description:** Retrieves a list of all categories.
- **Response (200 OK):**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "restaurantId": "string"
    }
  ]
  ```

### 2. Get Category by ID

- **Endpoint:** `GET /categories/{id}`
- **Description:** Retrieves details of a specific category.
- **Parameters:**
  - `id` _(string, required)_: The ID of the category.
- **Response (200 OK):**
  ```json
  {
    "id": "string",
    "name": "string",
    "restaurantId": "string"
  }
  ```

### 3. Create Category

- **Endpoint:** `POST /categories`
- **Description:** Adds a new category.
- **Request Body:**
  ```json
  {
    "name": "string",
    "restaurantId": "string"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "Category created successfully",
    "category": {
      "id": "string",
      "name": "string",
      "restaurantId": "string"
    }
  }
  ```

### 4. Update Category

- **Endpoint:** `PUT /categories/{id}`
- **Description:** Updates details of an existing category.
- **Parameters:**
  - `id` _(string, required)_: The ID of the category.
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Category updated successfully",
    "category": {
      "id": "string",
      "name": "string",
      "restaurantId": "string"
    }
  }
  ```

### 5. Delete Category

- **Endpoint:** `DELETE /categories/{id}`
- **Description:** Deletes a category.
- **Parameters:**
  - `id` _(string, required)_: The ID of the category.
- **Response (200 OK):**
  ```json
  {
    "message": "Category deleted successfully"
  }
  ```

---

## 🍽️ Menu Item Endpoints

### 1. Get All Menu Items

- **Endpoint:** `GET /menu-items`
- **Description:** Retrieves a list of all menu items.
- **Response (200 OK):**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": 0,
      "categoryId": "string",
      "restaurantId": "string",
      "isAvailable": true
    }
  ]
  ```

### 2. Get Menu Item by ID

- **Endpoint:** `GET /menu-items/{id}`
- **Description:** Retrieves details of a specific menu item.
- **Parameters:**
  - `id` _(string, required)_: The ID of the menu item.
- **Response (200 OK):**
  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": 0,
    "categoryId": "string",
    "restaurantId": "string",
    "isAvailable": true
  }
  ```

### 3. Create Menu Item

- **Endpoint:** `POST /menu-items`
- **Description:** Adds a new menu item.
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": 0,
    "categoryId": "string",
    "restaurantId": "string",
    "isAvailable": true
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "Menu item created successfully",
    "menuItem": {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": 0,
      "categoryId": "string",
      "restaurantId": "string",
      "isAvailable": true
    }
  }
  ```

### 4. Update Menu Item

- **Endpoint:** `PUT /menu-items/{id}`
- **Description:** Updates details of an existing menu item.
- **Parameters:**
  - `id` _(string, required)_: The ID of the menu item.
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": 0,
    "isAvailable": true
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Menu item updated successfully",
    "menuItem": {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": 0,
      "categoryId": "string",
      "restaurantId": "string",
      "isAvailable": true
    }
  }
  ```

### 5. Delete Menu Item

- **Endpoint:** `DELETE /menu-items/{id}`
- **Description:** Deletes a menu item.
- **Parameters:**
  - `id` _(string, required)_: The ID of the menu item.
- **Response (200 OK):**
  ```json
  {
    "message": "Menu item deleted successfully"
  }
  ```

---

## ⚙️ Notes

- Ensure the `Content-Type` header is set to `application/json` for `POST` and `PUT` requests.
- Replace placeholder values (`"string"`, `0`, `true`) with actual values when testing the API.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your enhancements.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

*Enhancing dining experiences through digital innovation.*
