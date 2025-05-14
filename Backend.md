
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
