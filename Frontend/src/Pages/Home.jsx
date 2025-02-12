import React, { useContext, useEffect, useState } from "react";
import "./Styles/home.css";
import AddToCart from "../Components/AddToCart/index.jsx";
import { ItemContext } from "../App.jsx";
import { fetchHomeMenu } from "../JavaScript/fetchData.js";
import { Grid, Box, Skeleton } from "@mui/material";

function MenuSection({ title, category }) {
  const {
    setSelectedIndex,
    loading,
    setLoading,
    error,
    setError,
    items,
    setItems,
  } = useContext(ItemContext);

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

  if (loading) {
    return (
      <>
        <div style={{ padding: "16px" }}>
          <Grid container wrap="wrap" justifyContent="flex-start">
            {(loading ? Array.from(new Array(6)) : data).map((item, index) => (
              <Box key={index} sx={{ width: 190, marginRight: 4, my: 1 }}>
                <Skeleton variant="rectangular" width={190} height={225} />

                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
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
                  alt={<Skeleton variant="rectangular" />}
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
              <AddToCart item={item} />
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