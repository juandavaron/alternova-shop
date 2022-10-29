import React from "react";
import { ShopContext } from "../ShopContext/ShopContext";

function ShopButton(props) {

  const { sendToCart } = React.useContext(ShopContext);

  return(
    <button onClick={() => sendToCart(props.productName)}>
      {props.children}
    </button>
  )
};

export { ShopButton }