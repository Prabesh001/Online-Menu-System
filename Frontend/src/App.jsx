import React, { createContext, useState, useEffect } from "react";
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./Pages/Home.jsx";
import FoodCategory from "./Pages/FoodCategory";
import SearchItem from "./Pages/SearchItem.jsx";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart/Cart.jsx";
import Table from "./Pages/Table.jsx";

export const CartContext = createContext();
export const ItemContext = createContext();

function Layout() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("CartItems")) || []
  );

  const [selectedIndex, setSelectedIndex] = useState(
    localStorage.getItem("index") || "Home"
  );

  const [count, setCount] = useState(
    Number(localStorage.getItem("count")) || 0
  );

  const [searchItem, setSearchItem] = useState(
    localStorage.getItem("searched-item") || ""
  );

  const [itemQuantity, setItemQuantity] = useState(1);
  const [popupVisiblilty, setPopupVisiblilty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  function closePopup() {
    setPopupVisiblilty(false);
  }

  useEffect(() => {
    localStorage.setItem("count", count);
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
  }, [count, cartItems]);

  function playAddToCartSound(){
    const audio = new Audio("../public/drop.m4a");
    audio.play();
  }

  const addToCart = (item) => {
    playAddToCartSound();
    const updatedItems = Array.isArray(item)
      ? item.map((ele) => ({
          ...ele,
          quantity: itemQuantity,
        }))
      : [{ ...item, quantity: itemQuantity }];

    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];

      updatedItems.forEach((newItem) => {
        const existingItemIndex = updatedCart.findIndex(
          (cartItem) => cartItem._id === newItem._id
        );

        if (existingItemIndex > -1) {
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + 1,
          };
        } else {
          updatedCart.push(newItem);
        }
      });

      const newCount = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setCount(newCount);
      return updatedCart;
    });
  };

  const hideNavbarFooter = ["/", "/login"];
  const hideCart = ["/", "/login", "/table"];

  const noIndex = ["/table", `/search/+${searchItem}`];

  useEffect(() => {
    if (location.pathname == "/") {
      setSelectedIndex("Home");
    } else if (noIndex.includes(location.pathname)) {
      setSelectedIndex(null);
    }
  }, [location.pathname, setSelectedIndex, noIndex]);

  return (
    <div  className={`web-body ${popupVisiblilty ? "blur" : ""}`}>
      <ItemContext.Provider
        value={{
          searchItem,
          setSearchItem,
          selectedIndex,
          setSelectedIndex,
          error,
          setError,
          loading,
          setLoading,
          items,
          setItems,
        }}
      >
        {!hideNavbarFooter.includes(location.pathname) && <Navbar />}
        <CartContext.Provider
          value={{
            count,
            setCount,
            popupVisiblilty,
            setPopupVisiblilty,
            closePopup,
            playAddToCartSound
          }}
        >
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Home" element={<Home />} />
            <Route
              path="/category/:category"
              element={<FoodCategory onAddToCart={addToCart} />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/search/:item"
              element={<SearchItem onAddToCart={addToCart} />}
            />
            <Route
              path="/table"
              element={
                <Cart
                  items={cartItems}
                  setItems={setCartItems}
                  setItemQuantity={setItemQuantity}
                />
              }
            />
          </Routes>
          {!hideNavbarFooter.includes(location.pathname) && <Footer />}
          {!hideCart.includes(location.pathname) && (
            <Table value={count} onclick={() => navigate("/table")} />
          )}
        </CartContext.Provider>
      </ItemContext.Provider>
    </div>
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
