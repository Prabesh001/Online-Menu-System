import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import FoodCategory from "./Pages/FoodCategory";
import Login from "./Pages/Login";
import Table from "./Pages/Table";
import Welcome from "./Pages/Welcome";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart/Cart";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Layout() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("CartItems")) || []
  );
  const [cartVisible, setCartVisible] = useState(false);
  const location = useLocation();
  const [count, setCount] = useState(
    Number(localStorage.getItem("count")) || cartItems.length
  );

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, item];
      setCount(updatedCart.length);
      localStorage.setItem("CartItems", JSON.stringify(updatedCart));
      return updatedCart;
      console.log(updatedCart);
    });
  };

  const toggleCart = () => {
    setCartVisible((prev) => !prev);
  };

  const navigate = useNavigate();
  const handleTableClick = () => {
    navigate("/table");
  };

  const hideNavbarFooter = ["/", "/login"];
  const hideCart = ["/", "/login", "/table"];

  return (
    <>
      {!hideNavbarFooter.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/category/:category"
          element={<FoodCategory onAddToCart={addToCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<Cart items={cartItems} />} />
      </Routes>
      {!hideNavbarFooter.includes(location.pathname) && <Footer />}
      {!hideCart.includes(location.pathname) && (
        <Link to="/table">
          <Table value={count} onClick={handleTableClick} />
        </Link>
      )}
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="244499214878-ski0knaamlp5gra4dlivu1lr9c5k1b17.apps.googleusercontent.com">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
