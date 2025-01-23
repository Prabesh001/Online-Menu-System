import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddToCart from "../AddToCart";
import Typography from "@mui/material/Typography";
import "./card.css";
import { RxCross2 } from "react-icons/rx";

function MediaCard({ itemSelected, setItemSelected }) {
  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("card-popup-overlay")) {
        setItemSelected([]);
      }
    };

    const body = document.querySelector(".card-popup-overlay");
    body?.addEventListener("click", handleOutsideClick);

    return () => {
      body?.removeEventListener("click", handleOutsideClick);
    };
  }, [setItemSelected]);
  
  return (
    <div className="popup-overlay card-popup-overlay">
      <Card sx={{ maxWidth: 345 }} className="item-card">
        <div className="item-card-badge" onClick={() => setItemSelected([])}>
          <RxCross2 fontSize={23} />
        </div>
        <CardMedia
          sx={{ height: 200 }}
          image={itemSelected.photoUrl}
          title={itemSelected.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemSelected.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {itemSelected.description}
          </Typography>
        </CardContent>
        <CardActions>
          <AddToCart item={itemSelected} setItemSelected={setItemSelected} />
        </CardActions>
      </Card>
    </div>
  );
}

export default MediaCard;
