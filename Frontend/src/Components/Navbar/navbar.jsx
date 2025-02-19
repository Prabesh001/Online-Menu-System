import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ItemContext } from "../../App";
import { useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import "./navbar.css";
import { API_BASE_URL } from "../../JavaScript/config";

// TrieNode for Autocomplete
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

// Trie Class
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    return this.collectWords(node, prefix);
  }

  collectWords(node, prefix) {
    const results = new Set();
    if (node.isEndOfWord) results.add(prefix);
    for (const [char, childNode] of Object.entries(node.children)) {
      this.collectWords(childNode, prefix + char).forEach(results.add, results);
    }
    return Array.from(results);
  }
}

function NavbarBoot({ onCategorySelect }) {
  const { setSearchItem, selectedIndex, setSelectedIndex } =
    useContext(ItemContext);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [trie, setTrie] = useState(new Trie());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const newTrie = new Trie();
        data.forEach((item) => newTrie.insert(item.name));
        setTrie(newTrie);
      })
      .catch((err) => console.error("Error loading menu data:", err));
  }, []);

  const handleSearchTerm = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() !== "") {
      const prefixResults = trie.searchPrefix(value.toLowerCase());
      fetch(API_BASE_URL)
        .then((res) => res.json())
        .then((data) => {
          const substringResults = data
            .filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((item) => item.name);
          const combinedResults = Array.from(
            new Set([...prefixResults, ...substringResults])
          );
          setSuggestions(combinedResults.slice(0, 5));
        })
        .catch((err) => console.error("Error loading menu data:", err));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchItem = () => {
    if (input !== "") {
      setSearchItem(input);
      localStorage.setItem("searched-item", input);
      navigate(`/search/${input}`);
    }
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setSearchItem(suggestion);
    navigate(`/search/${suggestion}`);
  };

  const categories = [
    "Home",
    "Appetizer",
    "Main Course",
    "Side Dish",
    "Beverage",
    "Soup",
    "Dessert",
  ];

  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    if (location.pathname !== "/table") {
      const handleScroll = () => {
        const currentScrollTop = document.documentElement.scrollTop;

        if (currentScrollTop > 30 && window.pageYOffset > 70) {
          if (currentScrollTop > lastScrollTop) {
            setScrollDirection("down");
          } else if (currentScrollTop < lastScrollTop) {
            setScrollDirection("up");
          }
        } else {
          setScrollDirection(null);
        }
        setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setScrollDirection(null);
    }
  }, [location, lastScrollTop]);

  return (
    <Navbar
      expand="lg"
      fixed={
        scrollDirection === "up" && location.pathname !== "/table" ? "top" : ""
      }
      className={`no-select ${
        scrollDirection === "up" ? "navbar-scroll-up" : ""
      }`}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/Home"
          onClick={() => onCategorySelect("All")}
          style={{ fontSize: "1.5em" }}
        >
          TableMate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto navbar-nav">
            {categories.map((category) => (
              <Nav.Link
                key={category}
                as={Link}
                to={
                  category === "Home"
                    ? "/Home"
                    : `/category/${category.replace(" ", "%20")}`
                }
                className={selectedIndex === category ? "navactive" : ""}
                onClick={() => setSelectedIndex(category)}
              >
                {category}
              </Nav.Link>
            ))}
          </Nav>
          <Form
            className="d-flex position-relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              value={input}
              onChange={handleSearchTerm}
            />
            <Button
              variant="outline-success"
              onClick={handleSearchItem}
              disabled={!input}
            >
              Search
            </Button>
            {suggestions.length > 0 && (
              <ul className="autocomplete-suggestions position-absolute bg-white border">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBoot;
