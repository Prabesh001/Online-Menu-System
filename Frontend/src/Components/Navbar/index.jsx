import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { ItemContext } from "../../App";

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
    const results = [];
    if (node.isEndOfWord) results.push(prefix);
    for (const [char, childNode] of Object.entries(node.children)) {
      results.push(...this.collectWords(childNode, prefix + char));
    }
    return results;
  }
}

function Index({ onCategorySelect }) {
  const { setSearchItem, selectedIndex, setSelectedIndex } =
    useContext(ItemContext);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [trie, setTrie] = useState(new Trie());
  const navigate = useNavigate();

  const selectIndex = (index) => {
    setSelectedIndex(index);
    localStorage.setItem("index", index);
    onCategorySelect(index);
  };

  useEffect(() => {
    // Populate Trie with menu data
    fetch("http://localhost:5000/api/menu")
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
      // Perform Trie search for prefix matches
      const prefixResults = trie.searchPrefix(value);

      // Fetch all menu data and perform substring search
      fetch("http://localhost:5000/api/menu")
        .then((res) => res.json())
        .then((data) => {
          // Perform substring search
          const substringResults = data
            .filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((item) => item.name);

          // Combine prefix and substring results and deduplicate (case insensitive)
          const combinedResults = Array.from(
            new Map(
              [...prefixResults, ...substringResults].map((item) => [
                item.toLowerCase(),
                item,
              ])
            ).values()
          );

          setSuggestions(combinedResults.slice(0, 5)); // Limit to 5 suggestions
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

  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollTop =  document.documentElement.scrollTop;

        if (currentScrollTop > 30 && window.pageYOffset>50) {
          if (currentScrollTop > lastScrollTop) {
            setScrollDirection("down");
          } else if (currentScrollTop < lastScrollTop) {
            setScrollDirection("up");
          }
        } else {
          setScrollDirection(null); // Reset if scrolled back to the top
        }
        setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // Avoid negative scroll
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollTop]);


  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${
        scrollDirection === "up" ? "navbar-scroll-up" : ""
      }`}
    >
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
                      ? "/Home"
                      : `/category/${category.replace(" ", "%20")}`
                  }
                  aria-current={selectedIndex === category ? "page" : undefined}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          <form
            className="d-flex position-relative"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={input}
              onChange={handleSearchTerm}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={handleSearchItem}
              disabled={!input}
            >
              Search
            </button>
            {suggestions.length > 0 && input != "" && (
              <ul className="autocomplete-suggestions position-absolute bg-white border">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item p-2"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Index;
