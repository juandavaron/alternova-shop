import React from "react";
import { ShopContext } from "../ShopContext/ShopContext";
import { ShopButton } from "../ShopButton/ShopButton";

function ShopCart() {
  const { cartProducts, total, removeItem } = React.useContext(ShopContext);

  return (
    <section className="cart__section section">
      <div className="cart__container">
        <h2>Cart</h2>
        <ul className="cart__list">
          {cartProducts.map(item => (
            <li className="cart__item" key={item.name}>
              <div>
              <span className="cart__label">Name Product:</span>
              <p>{item.name}</p>
              </div>
              <div>
              <span className="cart__label">Quantity</span>
              <p>{item.quantity}</p>
              </div>
              <div>
              <span className="cart__label">Price</span>
              <p>{item.unit_price}</p>
              </div>
              <div>
              <span className="cart__label">Sub-Total</span>
              <p>{item.unit_price * item.quantity}</p>
              </div>
              <ShopButton
              click={() => removeItem(item.name)}
              // Borrar
              >Delete</ShopButton>
            </li>
          ))}
        </ul>
        <div className="cart__total">
          <h3>Total:</h3>
          <p>{total}</p>
        </div>
      </div>
    </section>
  )
};

export { ShopCart };