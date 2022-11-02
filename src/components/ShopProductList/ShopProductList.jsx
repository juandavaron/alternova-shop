import React from "react";
import { ShopButton } from "../ShopButton/ShopButton";
import { ShopContext } from "../ShopContext/ShopContext";
import DefaultImg from "./../../styles/assets/default.png";

function ShopProductList() {

  const {
    productsList,
    sendToCart,
  } = React.useContext(ShopContext);

  return (
    <section className="productList__section section">
      <ul className="productList__list">
        {productsList.map(product => (
          <li className="productList__item" key={product.id}>
            <div className="productList__img">
              <img src={product.img ? product.img : DefaultImg} onClick={() => sendToCart(product)} alt={product.name}></img>
            </div>
            <div className="productList__info">
              <h1>{product.unit_price}</h1>
              <p>{product.name}</p>
              <ShopButton
                click={() => sendToCart(product)}
              > Add to cart</ShopButton>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
};

export { ShopProductList };