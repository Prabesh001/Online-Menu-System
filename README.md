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

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your enhancements.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

*Enhancing dining experiences through digital innovation.*
