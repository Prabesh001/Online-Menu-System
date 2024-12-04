import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Index({ onCategorySelect }) {
  const [selectedIndex, setSelectedIndex] = useState(
    localStorage.getItem("index") || "Home"
  );

  function selectIndex(index) {
    setSelectedIndex(index);
    localStorage.setItem("index", index);
    onCategorySelect(index);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/Home"
          onClick={() => {
            selectIndex("Home");
            onCategorySelect("All");
          }}
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
            <li className="nav-item" onClick={() => selectIndex("Home")}>
              <Link
                className={
                  selectedIndex === "Home" ? "nav-link active" : "nav-link"
                }
                to="/Home"
              >
                Home
              </Link>
            </li>

            <li className="nav-item" onClick={() => selectIndex("Appetizer")}>
              <Link
                className={
                  selectedIndex === "Appetizer" ? "nav-link active" : "nav-link"
                }
                to="/category/Appetizer"
              >
                Appetizer
              </Link>
            </li>
            <li className="nav-item" onClick={() => selectIndex("Main Course")}>
              <Link
                className={
                  selectedIndex === "Main Course"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/category/Main Course"
              >
                Main Course
              </Link>
            </li>
            <li className="nav-item" onClick={() => selectIndex("Side Dish")}>
              <Link
                className={
                  selectedIndex === "Side Dish" ? "nav-link active" : "nav-link"
                }
                to="/category/Side Dish"
              >
                Side Dish
              </Link>
            </li>
            <li className="nav-item" onClick={() => selectIndex("Beverage")}>
              <Link
                className={
                  selectedIndex === "Beverage" ? "nav-link active" : "nav-link"
                }
                to="/category/Beverage"
              >
                Beverage
              </Link>
            </li>
            <li className="nav-item" onClick={() => selectIndex("Soup")}>
              <Link
                className={
                  selectedIndex === "Soup" ? "nav-link active" : "nav-link"
                }
                to="/category/Soup"
              >
                Soup
              </Link>
            </li>
            <li className="nav-item" onClick={() => selectIndex("Dessert")}>
              <Link
                className={
                  selectedIndex === "Dessert" ? "nav-link active" : "nav-link"
                }
                to="/category/Dessert"
              >
                Dessert
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

export default Index;
