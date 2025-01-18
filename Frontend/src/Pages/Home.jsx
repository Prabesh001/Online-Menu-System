import React, { useContext, useEffect, useState } from "react";
import "./Styles/home.css";
import AddToCart from "../Components/AddToCart/index.jsx";
import { ItemContext } from "../App.jsx";
import { Toaster, toast } from "sonner";
import { fetchHomeMenu } from "../JavaScript/fetchData.js";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Grid, Box, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MenuSection({ title, category }) {
  const {
    setSelectedIndex,
    loading,
    setLoading,
    error,
    setError,
    items,
    setItems,
    addToCart,
  } = useContext(ItemContext);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedIndex("Home");
    setItems([]);
    setLoading(true);
    setError(null);

    const getData = async () => {
      try {
        const data = await fetchHomeMenu();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleAction = (action, itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity:
                action === "plus"
                  ? (item.quantity || 1) + 1
                  : Math.max((item.quantity || 0) - 1, 0),
            }
          : item
      )
    );
  };

  if (loading) {
    return (
      <>
        <div style={{ padding: "10px" }}>
          <Grid container wrap="wrap" justifyContent="flex-start">
            {(loading ? Array.from(new Array(6)) : data).map((item, index) => (
              <Box key={index} sx={{ width: 210, marginRight: 3, my: 5 }}>
                <Skeleton variant="rectangular" width={210} height={255} />

                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Skeleton width={100} height={55} />
                    <Skeleton variant="rectangular" width={80} height={35} />
                  </div>
                </Box>
              </Box>
            ))}
          </Grid>
        </div>
      </>
    );
  }

  if (error) {
    return <div className="loading-failed">{error}</div>;
  }
  return (
    <div className="home-page">
      <h2 className="home-offer">{title}</h2>
      <div className="menu-items">
        {items
          .filter((item) => item.category.includes(category))
          .map((item, i) => (
            <div key={i} className="menu-item" title={item.description}>
              <div className="menu-photo">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="offer-photo no-select"
                  loading="lazy"
                  draggable="false"
                />
              </div>
              <div className="item-name" title={item.name}>
                {item.name}
              </div>
              <br />
              <del className="discounted"> Rs. {item.price.toFixed(0)}</del>
              {item.discountedPrice && (
                <span className="actual-price">
                  Rs. {item.discountedPrice.toFixed(0)}
                </span>
              )}
              <br />
              <div className="add-btn-group">
                <div className="set-item-quantity">
                  <MinusIcon
                    size="18px"
                    cursor="pointer"
                    color="gray"
                    onClick={() => handleAction("minus", item._id)}
                  />
                  <input key={item.id} readOnly value={item.quantity || 1} />
                  <PlusIcon
                    size="18px"
                    color="gray"
                    cursor="pointer"
                    onClick={() => handleAction("plus", item._id)}
                  />
                </div>
                <AddToCart
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.name} added to Table.`);
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Home() {
  const Menu = [
    { title: "Today's Special", category: "hot-section" },
    { title: "Winter Special", category: "winter" },
    { title: "Christmas Special", category: "christmas" },
    { title: "Combo Offers", category: "combo" },
  ];
  return (
    <>
      <div className="home-section">
        <Toaster richColors position="bottom-center" />
        {Menu.map((menu, i) => {
          return (
            <MenuSection title={menu.title} category={menu.category} key={i} />
          );
        })}
        <br />
      </div>
      <center>
        <span className="slogan">Keep Eating....</span>
      </center>
    </>
  );
}

export default Home;
