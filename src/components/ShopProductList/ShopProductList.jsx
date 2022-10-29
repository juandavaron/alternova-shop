import React from "react";
import { ShopButton } from "../ShopButton/ShopButton";
import { ShopContext } from "../ShopContext/ShopContext";

function ShopProductList() {

  const {
    API,
    sendToCart
  } = React.useContext(ShopContext);

  return (
    <section className="productList__section section">
      <ul className="productList__list">
        {API.products.map(product => (
          <li className="productList__item" key={product.name}>
            <img src={product.img} onClick={() => sendToCart(product.name)} alt={product.name}></img>
            <div className="productList__info">
              <h1>{product.unit_price}</h1>
              <p>{product.name}</p>
              <ShopButton
              productName={product.name}
              > Add to cart</ShopButton>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
};

export { ShopProductList };