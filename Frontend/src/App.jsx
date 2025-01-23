import React, { createContext, useState, useEffect } from "react";
import "./App.css";
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
import Cart from "./Pages/Cart.jsx";
import TableReserve from "./Pages/TableReserve.jsx";
import EmployeePage from "./Pages/EmployeePage/EmployeePage.jsx";
import AboutUs from "./Pages/FooterOption/AboutUs.jsx";
import Advertisement from "./Pages/FooterOption/Advertisement.jsx";
import Marketing from "./Pages/FooterOption/Marketing.jsx";
import TermsOfUse from "./Pages/FooterOption/TermsOfUse.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import PaymentSuccess from "./Pages/Payment/PAymentSuccess.jsx";
import PaymentFailure from "./Pages/Payment/PaymentFailure.jsx";
// import CookiePolicy from "./Pages/FooterOption/CookiePolicy.jsx";
// import PrivacyPolicy from "./Pages/FooterOption/PrivacyPolicy.jsx";
import ProtectedRoute from "./JavaScript/ProtectedRoute.jsx";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Footer";
import Table from "./Components/Table/Table.jsx";
import { fetchOrders, updateTable } from "./JavaScript/fetchData.js";
import { Toaster, toast } from "sonner";

export const CartContext = createContext();
export const ItemContext = createContext();
export const AuthContext = createContext();

function Layout() {
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("CartItems")) || []
  );
  const [selectedIndex, setSelectedIndex] = useState(
    () => localStorage.getItem("index") || "Home"
  );
  const [count, setCount] = useState(
    () => Number(localStorage.getItem("count")) || 0
  );
  const [searchItem, setSearchItem] = useState(
    () => localStorage.getItem("searched-item") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [coupen, setCoupen] = useState(
    () => localStorage.getItem("user") || ""
  );
  const [tableNumber, setTableNumber] = useState(
    () => Number(localStorage.getItem("TableNumber")) || null
  );

  const [popupVisiblilty, setPopupVisiblilty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [customerOrder, setCustomerOrder] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  function closePopup() {
    setPopupVisiblilty(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const tabledata = await fetchOrders();

        if (tableNumber === null) {
          navigate("/");
          return;
        }

        const myTable = tabledata.find(
          (tab) => tab.table === Number(tableNumber)
        );

        if (myTable) {
          myTable.available = false;
          setCustomerOrder([myTable]);
          const updatedData = { available: false };
          updateTable(myTable.table, updatedData);
        } else {
          console.warn("Table not found in tabledata");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableNumber]);

  useEffect(() => {
    localStorage.setItem("user", coupen);
  }, [coupen]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setCount(0);
    }
    localStorage.setItem("count", count);
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
  }, [count, cartItems]);

  useEffect(() => {
    setCustomerOrder((prevOrders) =>
      prevOrders.map((item) =>
        item.table === tableNumber ? { ...item, orders: cartItems } : item
      )
    );
    const updatedTable = { orders: cartItems };
    updateTable(tableNumber, updatedTable);
  }, [cartItems, tableNumber]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const audio = new Audio("../drop.m4a");
  function playAddToCartSound() {
    audio.play();
  }

  const hideNavbarFooter = ["/", "/login", "/reserve-seat", "/employee"];
  const hideCart = [
    ...hideNavbarFooter,
    "/table",
    "/paymentsuccess",
    "/tablemate/about-us",
    "/tablemate/advertisement",
  ];
  const noIndex = ["/table", `/search/${searchItem}`, ...hideNavbarFooter];

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedIndex("Home");
    } else if (noIndex.includes(location.pathname)) {
      setSelectedIndex(null);
    }
  }, [location.pathname, selectedIndex, noIndex]);

  return (
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
        // addToCart,
      }}
    >
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
          customerOrder,
          setCustomerOrder,
        }}
      >
        <AuthContext.Provider
          value={{
            isAuthenticated,
            setIsAuthenticated,
            tableNumber,
            customerOrder,
          }}
        >
          <div className="app-main">
            <div className="app-header">
              {!hideNavbarFooter.includes(location.pathname) && <Navbar />}
            </div>
            <div className="app-body">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/category/:category" element={<FoodCategory />} />
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
                <Route path="/search/:item" element={<SearchItem />} />
                <Route
                  path="/table"
                  element={<Cart items={cartItems} setItems={setCartItems} />}
                />
                <Route
                  path="reserve-seat"
                  element={
                    <ProtectedRoute
                      condition={tableNumber}
                      passCondition={null}
                      destination="/Home"
                    >
                      <TableReserve />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route path="/tablemate/about-us" element={<AboutUs />} />
                <Route
                  path="/tablemate/advertisement"
                  element={<Advertisement />}
                />
                <Route path="/tablemate/marketing" element={<Marketing />} />
                <Route
                  path="/tablemate/terms-of-use"
                  element={<TermsOfUse />}
                />
                <Route path="/paymentsuccess" element={<PaymentSuccess />} />
                <Route path="/paymentfailure" element={<PaymentFailure />} />
                {/* <Route path="/tablemate/cookie-policy" element={<CookiePolicy />} /> */}
                {/* <Routes path="/tablemate/privacy-policy" element={<PrivacyPolicy />} /> */}

                <Route
                  path="*"
                  element={<ErrorPage setSelectedIndex={setSelectedIndex} />}
                />
              </Routes>
            </div>
            <div className="app-footer">
              {!hideNavbarFooter.includes(location.pathname) && <Footer />}
            </div>
            {!hideCart.includes(location.pathname) && (
              <Table value={count} onclick={() => navigate("/table")} />
            )}
          </div>
        </AuthContext.Provider>
      </CartContext.Provider>
    </ItemContext.Provider>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="244499214878-ski0knaamlp5gra4dlivu1lr9c5k1b17.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster richColors position="bottom-center" />
        <Layout />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
