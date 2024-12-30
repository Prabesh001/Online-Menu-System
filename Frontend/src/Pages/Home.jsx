import React, { useContext, useEffect, useState } from "react";
import menu from "../JavaScript/menu.js";
import "./Styles/home.css";
import AddToCart from "../Components/AddToCart/index.jsx";
import { ItemContext } from "../App.jsx";
import { Toaster, toast } from "sonner";

function MenuSection({ title, category }) {
  const { setSelectedIndex } = useContext(ItemContext);
  useEffect(() => {
    setSelectedIndex("Home");
  }, []);

  return (
    <div>
      <h2 className="home-offer">{title}</h2>
      <div className="menu-items">
        {menu
          .filter((item) => item.status.includes(category))
          .map((item) => (
            <div
              key={item.name + Math.random()}
              className="menu-item"
              title={item.details}
            >
              <div className="menu-photo">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="offer-photo"
                  loading="lazy"
                  draggable="false"
                />
              </div>
              <span className="item-name" title={item.name}>
                {item.name}
              </span>
              <br />
              <del className="discounted"> Rs. {item.price.toFixed(0)}</del>
              {item.discountedPrice && (
                <span className="actual-price">
                  Rs. {item.discountedPrice.toFixed(0)}
                </span>
              )}
              <br />
              <AddToCart
                onClick={() => toast.success(item.name + " added to Cart.")}
              />
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
    <div className="home-section">
      <Toaster richColors position="bottom-center" />
      {Menu.map((menu) => {
        return (
          <MenuSection
            title={menu.title}
            category={menu.category}
            key={menu.title}
          />
        );
      })}
      <br />
      <center>
        <p className="slogan">Keep Eating....</p>
      </center>
    </div>
  );
}

export default Home;
