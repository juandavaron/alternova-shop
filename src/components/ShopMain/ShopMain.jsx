import React from "react";
import { ShopCart } from "../ShopCart/ShopCart";
import { ShopProductList } from "../ShopProductList/ShopProductList";

function ShopMain() {
  return (
    <main className="main">
      <div className="main__container container">
        <ShopProductList />
        <ShopCart />
      </div>
    </main>
  )
};

export { ShopMain };