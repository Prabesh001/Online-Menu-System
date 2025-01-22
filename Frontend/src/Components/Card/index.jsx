import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddToCart from "../AddToCart";
import Typography from "@mui/material/Typography";
import "./card.css";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";

function MediaCard({ itemSelected , setItemSelected}) {
  return (
    <div className="popup-overlay">
      <Card sx={{ maxWidth: 345 }} className="item-card">
        <div className="item-card-badge" onClick={()=>setItemSelected([])}><RxCross2 fontSize={23}/></div>
        <CardMedia
          sx={{ height: 140 }}
          image={
            itemSelected.photo ||
            "https://mui.com/static/images/cards/paella.jpg"
          }
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
          <AddToCart
            onClick={() => {
              itemSelected.availability === true
                ? AddToCart(itemSelected)
                : toast.error(`${itemSelected.name} isn't available!`);
            }}
            forMinus={() => handleAction("minus", itemSelected._id)}
            forPlus={() => handleAction("plus", itemSelected._id)}
            forInput={itemSelected.quantity || 1}
          />
        </CardActions>
      </Card>
    </div>
  );
}

export default MediaCard;
