import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function index() {
  const [selectedIndex, setSelectedIndex] = useState(
    localStorage.getItem("index") || ""
  );

  const [items, setItem] = useState(0);

  function selectIndex(index) {
    setSelectedIndex(index);
    localStorage.setItem("index", index);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/home"
          onClick={() => selectIndex("home")}
        >
          TableMate
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" onClick={() => selectIndex("home")}>
              <Link
                className={
                  selectedIndex === "home" ? "nav-link active" : "nav-link"
                }
                to="/home"
              >
                Home
              </Link>
            </li>

            <li className="nav-item" onClick={() => selectIndex("cuisines")}>
              <Link
                className={
                  selectedIndex === "cuisines" ? "nav-link active" : "nav-link"
                }
                to="/cuisines"
              >
                Cuisines
              </Link>
            </li>
            <li className="nav-item" onClick={() => selectIndex("drinks")}>
              <Link
                className={
                  selectedIndex === "drinks" ? "nav-link active" : "nav-link"
                }
                to="/drinks"
              >
                Drinks
              </Link>
            </li>
            <li className="nav-item" onClick={() => selectIndex("snacks")}>
              <Link
                className={
                  selectedIndex === "snacks" ? "nav-link active" : "nav-link"
                }
                to="/snacks"
              >
                Snacks
              </Link>
            </li>
            <li className="nav-item" onClick={() => selectIndex("khajaSet")}>
              <Link
                className={
                  selectedIndex === "khajaSet" ? "nav-link active" : "nav-link"
                }
                to="/khaja-set"
              >
                Khaja Set
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default index;
