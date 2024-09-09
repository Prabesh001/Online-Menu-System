import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import FoodCategory from "./Pages/FoodCategory";
import Login from "./Pages/Login";
import Table from "./Pages/Table";
import Welcome from "./Pages/Welcome";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" || location.pathname === "/login" ?  null : <Navbar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cuisines" element={<FoodCategory />} />
        <Route path="/drinks" element={<FoodCategory />} />
        <Route path="/snacks" element={<FoodCategory />} />
        <Route path="/khaja-set" element={<FoodCategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<Table />} />
      </Routes>
      {location.pathname === "/" || location.pathname === "/login" || location.pathname === "/table" ?  null : <Cart />}
      {location.pathname === "/" || location.pathname === "/login" ?  null : <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
