import React, { useContext, useEffect, useState } from "react";
import "./Styles/home.css";
import AddToCart from "../Components/AddToCart/index.jsx";
import { ItemContext } from "../App.jsx";
import { fetchHomeMenu, fetchTransaction } from "../JavaScript/fetchData.js";
import { Grid, Box, Skeleton } from "@mui/material";
import Badge from "@mui/material/Badge";

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

  if (items.length===0) {
    return (
      <>
        <div style={{ padding: "16px" }}>
          <Grid container wrap="wrap" justifyContent="flex-start">
            {(loading || items.length === 0
              ? Array.from(new Array(6))
              : data
            ).map((_, index) => (
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
          .map((item, _) => (
            <Card
              myItem={item}
              key={item._id}
              description={item.description}
              photo={item.photo}
              name={item.name}
              discountedPrice={item.discountedPrice.toFixed(0)}
              price={item.price.toFixed(0)}
              cart={<AddToCart item={item} />}
            />
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

  const [mostBought, setMostBought] = useState([]);

  useEffect(() => {
    setMostBought([]);

    const getData = async () => {
      try {
        const data = await fetchTransaction();

        // Ensure count is correctly handled (default to 1 if missing)
        const processedData = data.map((item) => ({
          ...item,
          count: item.count ? Number(item.count) : 1, // Ensure count is a number
        }));

        setMostBought(processedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="home-section">
        <div className="home-page">
          <h2 className="home-offer">Top Selling Items</h2>
          <div className="menu-items">
            {mostBought.length === 0
              ? Array.from(new Array(6)).map((_, index) => (
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
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={35}
                        />
                      </div>
                    </Box>
                  </Box>
                ))
              : mostBought.map((item, _) => (
                  <div key={item._id}>
                    <Badge
                      badgeContent={item.count}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      color="primary"
                      max={99}
                    >
                      <Card
                        myItem={item}
                        key={item._id}
                        description={item.description}
                        photo={item.photo}
                        name={item.name}
                        discountedPrice={item.discountedPrice.toFixed(0)}
                        price={item.price.toFixed(0)}
                        cart={<AddToCart item={item} />}
                      />
                    </Badge>
                  </div>
                ))}
          </div>
        </div>
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

const Card = ({ description, photo, name, cart, price, discountedPrice }) => {
  return (
    <div className="menu-item" title={description}>
      <div className="menu-photo">
        <img
          src={photo}
          alt={<Skeleton variant="rectangular" />}
          className="offer-photo no-select"
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="item-name" title={name}>
        {name}
      </div>
      <br />
      <del className="discounted"> Rs. {price}</del>
      {discountedPrice && (
        <span className="actual-price">Rs. {discountedPrice}</span>
      )}
      <br />
      {cart}
    </div>
  );
};

export default Home;
