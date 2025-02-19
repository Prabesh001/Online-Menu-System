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

//Pages
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
import PaymentSuccess from "./Pages/Payment/PaymentSuccess.jsx";
import PaymentFailure from "./Pages/Payment/PaymentFailure.jsx";
// import CookiePolicy from "./Pages/FooterOption/CookiePolicy.jsx";
// import PrivacyPolicy from "./Pages/FooterOption/PrivacyPolicy.jsx";

//Components
import Navbar from "./Components/Navbar/navbar.jsx";
import Footer from "./Components/Footer";
import Table from "./Components/Table/Table.jsx";
import { Toaster, toast } from "sonner";

//Functions or Functional Components
import { fetchOrders, updateTable } from "./JavaScript/fetchData.js";
import ProtectedRoute from "./JavaScript/ProtectedRoute.jsx";
import { useLocalStorage } from "./JavaScript/useLocalStorage.jsx";

//Contexts
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
  const [searchItem, setSearchItem] = useState(
    () => localStorage.getItem("searched-item") || ""
  );
  const [tableNumber, setTableNumber] = useState(
    () => Number(localStorage.getItem("TableNumber")) || null
  );

  const [clickPayment, setClickPayment] = useLocalStorage(
    "clickPayment",
    false
  );
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const [coupen, setCoupen] = useLocalStorage("user", false);

  const [count, setCount] = useState(0);
  const [popupVisiblilty, setPopupVisiblilty] = useState(null);
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
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
    if (cartItems.length === 0) {
      setCount(0);
    } else {
      let length = 0;
      cartItems.map((item) => {
        length += item.quantity;
        setCount(length);
      });
    }
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

  const audio = new Audio("../drop.m4a");
  function playAddToCartSound() {
    audio.play();
  }

  const footerOptions = [
    "/tablemate/about-us",
    "/tablemate/advertisement",
    "/tablemate/terms-of-use",
    "/tablemate/marketing",
    "/tablemate/privacy-policy",
    "/tablemate/cookie-policy",
  ];

  const showCart = [
    "/home",
    "/category/appetizer",
    "/category/main course",
    "/category/side dish",
    "/category/beverage",
    "/category/soup",
    "/category/dessert",
    `/search/${searchItem}`,
    "paymentfailure",
  ];
  const hideNavbarFooter = ["/", "/login", "/reserve-seat", "/employee"];

  const noIndex = ["/table", `/search/${searchItem}`, ...hideNavbarFooter];

  useEffect(() => {
    const loc = location.pathname.toLowerCase();
    if (!showCart.includes(loc.replace("%20", " "))) {
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
          clickPayment,
          setClickPayment,
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
                      failDestination="/login"
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
                  path="/reserve-seat"
                  element={
                    <ProtectedRoute
                      condition={tableNumber === null}
                      failDestination="/Home"
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
                {/* <Route
                  path="/tablemate/cookie-policy"
                  element={<CookiePolicy />}
                />
                <Route
                  path="/tablemate/privacy-policy"
                  element={<PrivacyPolicy />}
                /> */}
                <Route
                  path="/tablemate/terms-of-use"
                  element={<TermsOfUse />}
                />
                <Route
                  path="/paymentsuccess"
                  element={
                    <ProtectedRoute
                      condition={clickPayment}
                      failDestination="/Home"
                    >
                      <PaymentSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/paymentfailure"
                  element={
                    <ProtectedRoute
                      condition={clickPayment}
                      failDestination="/Home"
                    >
                      <PaymentFailure />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="*"
                  element={<ErrorPage setSelectedIndex={setSelectedIndex} />}
                />
              </Routes>
            </div>
            <div className="app-footer">
              {!hideNavbarFooter.includes(location.pathname) && <Footer />}
            </div>
            {showCart.includes(
              location.pathname.toLowerCase().replace("%20", " ")
            ) && <Table value={count} onclick={() => navigate("/table")} />}
          </div>
        </AuthContext.Provider>
      </CartContext.Provider>
    </ItemContext.Provider>
  );
}

function App() {
  function NormalizePath() {
    const location = useLocation();

    if (location.pathname !== "/" && location.pathname.endsWith("/")) {
      return <Navigate to={location.pathname.replace(/\/+$/, "")} replace />;
    }
    return null;
  }
  return (
    <GoogleOAuthProvider clientId="244499214878-ski0knaamlp5gra4dlivu1lr9c5k1b17.apps.googleusercontent.com">
      <BrowserRouter>
        <NormalizePath />
        <Toaster richColors position="bottom-center" />
        <Layout />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
