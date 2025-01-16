import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./Pages/Home.jsx";
import FoodCategory from "./Pages/FoodCategory";
import SearchItem from "./Pages/SearchItem.jsx";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Footer";
import Cart from "./Pages/Cart.jsx";
import Table from "./Components/Table/Table.jsx";
import EmployeePage from "./Pages/EmployeePage.jsx";
import ProtectedRoute from "./JavaScript/ProtectedRoute.jsx";
import TableReserve from "./Pages/TableReserve.jsx";
import AboutUs from "./Pages/FooterOption/AboutUs.jsx";
import Advertisement from "./Pages/FooterOption/Advertisement.jsx";
import Marketing from "./Pages/FooterOption/Marketing.jsx";
import TermsOfUse from "./Pages/FooterOption/TermsOfUse.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
// import CookiePolicy from "./Pages/FooterOption/CookiePolicy.jsx";
// import PrivacyPolicy from "./Pages/FooterOption/PrivacyPolicy.jsx";

export const CartContext = createContext();
export const ItemContext = createContext();
export const AuthContext = createContext();

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
  const [tableNumber, setTableNumber] = useState(
    localStorage.getItem("TableNumber") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [coupen, setCoupen] = useState(localStorage.getItem("user") || false);

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
    localStorage.setItem("user", coupen);
  }, [coupen]);

  useEffect(() => {
    localStorage.setItem("count", count);
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
  }, [count, cartItems]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const audio = new Audio("../drop.m4a");

  function playAddToCartSound() {
    audio.play();
  }

  const addToCart = (item) => {
    playAddToCartSound();

    const orderedTime = new Date().toISOString();

    const itemsToAdd = Array.isArray(item)
      ? item.map((ele) => ({
          ...ele,
          quantity: ele.quantity || 1,
          orderedTime: [orderedTime],
          isDelivered: false,
        }))
      : [
          {
            ...item,
            quantity: item.quantity || 1,
            orderedTime: [orderedTime],
            isDelivered: false,
          },
        ];

    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];

      itemsToAdd.forEach((newItem) => {
        const existingItemIndex = updatedCart.findIndex(
          (cartItem) => cartItem._id === newItem._id
        );

        if (existingItemIndex > -1) {
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity:
              updatedCart[existingItemIndex].quantity + newItem.quantity,
            orderedTime: [
              ...new Set([
                ...newItem.orderedTime,
                ...updatedCart[existingItemIndex].orderedTime,
              ]),
            ],
            isDelivered: false,
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

  const hideNavbarFooter = ["/", "/login", "/reserve-seat"];
  const hideCart = [
    "/",
    "/login",
    "/table",
    "/employee",
    "/reserve-seat",
    "/tablemate/about-us",
    "/tablemate/advertisement",
    "/tablemate/marketing",
    "/tablemate/terms-of-use",
    "/tablemate/cookie-policy",
    "/tablemate/privacy-policy",
  ];

  const noIndex = [
    "/table",
    "/employee",
    `/search/+${searchItem}`,
    "/tablemate/about-us",
    "/tablemate/advertisement",
    "/tablemate/marketing",
    "/tablemate/terms-of-use",
    "/tablemate/cookie-policy",
    "/tablemate/privacy-policy",
  ];

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedIndex("Home");
    } else if (noIndex.includes(location.pathname)) {
      setSelectedIndex(null);
    }
  }, [location.pathname, setSelectedIndex, noIndex]);

  return (
    <>
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
          cartItems,
          setCartItems,
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
            playAddToCartSound,
            coupen,
            setCoupen,
            setTableNumber,
            tableNumber,
          }}
        >
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/Home" element={<Home />} />
              <Route
                path="/category/:category"
                element={<FoodCategory onAddToCart={addToCart} />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/employee"
                element={
                  <ProtectedRoute
                    condition={isAuthenticated}
                    passCondition={true}
                    destination="/login"
                  >
                    <EmployeePage />
                  </ProtectedRoute>
                }
              />
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
              <Route
                path="reserve-seat"
                element={
                  <ProtectedRoute
                    condition={tableNumber}
                    passCondition={null}
                    destination="/Home"
                  >
                    <TableReserve noOfTables={25} />
                  </ProtectedRoute>
                }
              ></Route>

              <Route path="/tablemate/about-us" element={<AboutUs />} />
              <Route path="/tablemate/advertisement" element={<Advertisement />} />
              <Route path="/tablemate/marketing" element={<Marketing />} />
              <Route path="/tablemate/terms-of-use" element={<TermsOfUse />} />
              {/* <Route path="/tablemate/cookie-policy" element={<CookiePolicy />} /> */}
              {/* <Routes path="/tablemate/privacy-policy" element={<PrivacyPolicy />} /> */}

              <Route
                path="*"
                element={<ErrorPage setSelectedIndex={setSelectedIndex} />}
              />
            </Routes>
            {!hideNavbarFooter.includes(location.pathname) && <Footer />}
            {!hideCart.includes(location.pathname) && (
              <Table value={count} onclick={() => navigate("/table")} />
            )}
          </AuthContext.Provider>
        </CartContext.Provider>
      </ItemContext.Provider>
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
