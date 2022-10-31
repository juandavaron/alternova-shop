import React from "react";
import { ShopContext } from "../ShopContext/ShopContext";

function ShopButton({
  children,
  click
}) {

  return(
    <button onClick={click}>
      {children}
    </button>
  )
};

export { ShopButton }