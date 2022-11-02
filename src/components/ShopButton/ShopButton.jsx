import React from "react";

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