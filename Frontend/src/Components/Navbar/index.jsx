import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { ItemContext } from "../../App";

function Index({ onCategorySelect }) {
  const { searchItem, setSearchItem, selectedIndex, setSelectedIndex } =
    useContext(ItemContext);

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const selectIndex = (index) => {
    setSelectedIndex(index);
    localStorage.setItem("index", index);
    onCategorySelect(index);
  };

  const handleSearchTerm = (e) => {
    setInput(e.target.value);
  };

  const handleSearchItem = () => {
    setSelectedIndex(null);
    if (input !== "") {
      setSearchItem(input);
      localStorage.setItem("searched-item", input);
      navigate(`/search/${input}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/home"
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
            {[
              "Home",
              "Appetizer",
              "Main Course",
              "Side Dish",
              "Beverage",
              "Soup",
              "Dessert",
            ].map((category) => (
              <li
                className="nav-item"
                key={category}
                onClick={() => selectIndex(category)}
              >
                <Link
                  className={
                    selectedIndex === category ? "nav-link active" : "nav-link"
                  }
                  to={
                    category === "Home"
                      ? "/home"
                      : `/category/${category.replace(" ", "%20")}`
                  }
                  aria-current={selectedIndex === category ? "page" : undefined}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={input}
              onChange={handleSearchTerm}
              required
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={handleSearchItem}
              disabled={!input}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Index;
