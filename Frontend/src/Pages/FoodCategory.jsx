import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../Components/AddToCart";
import "./Styles/FoodCategory.css";
import { ItemContext } from "../App";
import LoadingComponent from "../Components/Loading/loading";
import { fetchItems } from "../JavaScript/fetchData";
import Card from "../Components/Card";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

function FoodCategory() {
  const {
    setSelectedIndex,
    loading,
    setLoading,
    error,
    setError,
    items,
    setItems,
  } = useContext(ItemContext);
  const { category } = useParams(); // Get the category from the URL params

  const [itemSelected, setItemSelected] = useState([]);
  const [veg, setVeg] = useState(JSON.parse(localStorage.getItem("veg"))||false);

  useEffect(() => {
    if (itemSelected?.length === 0) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [itemSelected]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setItems([]);

    const getData = async () => {
      try {
        const data = await fetchItems();
        const filteredData =
          category === "All"
            ? data
            : data.filter((item) => item.category === category);

        const filteredItems = filteredData.filter(
          (ele) => ele.availability === true
        );

        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    getData();
    setSelectedIndex(category);
  }, [category]);

  if (error) {
    return <div className="loading-failed">{error}</div>;
  }

  const handleToggleVeg = ()=>{
    setVeg((p) => !p)
    localStorage.setItem("veg", !veg)
  }

  const displayedItems = veg
  ? items.filter((item) => item.foodPreferences === "Veg")
  : items;

  return (
    <div className="food-category">
      <h2 className="category-title">{category}</h2>
      <div
        onClick={handleToggleVeg}
        style={{ position: "absolute", right: 20, top: 20 }}
      >
        Veg:{" "}
        {!veg ? (
          <ToggleOffIcon fontSize="large" style={{color:"red"}} />
        ) : (
          <ToggleOnIcon fontSize="large" style={{color:"green"}} />
        )}
      </div>
      {loading || displayedItems.length === 0 ? (
        <LoadingComponent mh={50} />
      ) : (
        <ul className="item-list">
          {displayedItems.map((item) => (
            <li key={item._id} className="item">
              <div
                className="item-info no-select"
                onDoubleClick={() => setItemSelected(item)}
              >
                <h3>{item.name}</h3>
                <span style={{ fontSize: "13px", fontStyle: "italic" }}>
                  {item.foodPreferences === "Veg" ? (
                    <span style={{ color: "green" }} className="no-select">
                      (Veg)
                    </span>
                  ) : item.foodPreferences === "Non-veg" ? (
                    <span style={{ color: "red" }}>(Non-Veg)</span>
                  ) : (
                    ""
                  )}
                </span>
                <p className="no-select">{item.description}</p>
                <p>Rs. {item.price}</p>
              </div>
              <AddToCart item={item} />
            </li>
          ))}
          {itemSelected?.length === 0 ? null : (
            <Card
              itemSelected={itemSelected}
              setItemSelected={setItemSelected}
            />
          )}
        </ul>
      )}
    </div>
  );
}

export default FoodCategory;
