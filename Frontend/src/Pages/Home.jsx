import React from "react";
import menu from "./menu.js";
import "./Styles/home.css";
import AddToCart from "../Components/AddToCart/index.jsx";

function MenuSection({ title, category }) {
  return (
    <div>
      <h2 className="home-offer">{title}</h2>
      <div className="menu-items">
        {menu
          .filter((item) => item.status.includes(category))
          .map((item) => (
            <div key={item.name} className="menu-item" title={item.details}>
              <div className="menu-photo">
              <img src={item.photo} alt={item.name} className="offer-photo" />
              </div>
              <h6 className="item-name" title={item.name}>
                {item.name}
              </h6>
              <del className="discounted"> Rs. {item.price.toFixed(0)}</del>
              {item.discountedPrice && (
                <span>Rs. {item.discountedPrice.toFixed(0)}</span>
              )}
              <br />
              <AddToCart />
            </div>
          ))}
      </div>
      
    </div>
  );
}

function Home() {
  return (
    <div className="home-section">
        <MenuSection title="Today's Special" category="hot-section" />
        <MenuSection title="Winter Special" category="winter" />
        <MenuSection title="Christmas Special" category="christmas" />
        <MenuSection title="Combo Offers" category="combo" />
        <br />
        <center>
          <p className="slogan">Keep Eating....</p>
        </center>
      
    </div>
  );
}

export default Home;
