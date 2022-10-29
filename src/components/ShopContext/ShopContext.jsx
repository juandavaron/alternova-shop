import React from "react";
import API from "./../../productsList.json"
import Cart from "./../../cartList.json"

const ShopContext = React.createContext();


function ShopProvider(props) {

  // Estado Carrito
  const [cartProducts, setCartProducts] = React.useState(Cart.products)
  // Estado Total
  const [total, setTotal] = React.useState(0);
  // Estado Modal
  const [openModal, setOpenModal] = React.useState(false);

  // Enviar producto a Cart y quitar stock
  const sendToCart = (productName) => {

    // Encontrar el producto
    const productIndex = API.products.findIndex(item => item.name === productName);
    const productBought = API.products[productIndex];

    // Eliminar y comprobar la cantidad del stock
    productBought.stock = productBought.stock - 1;
    if (productBought.stock < 0) {
      setOpenModal(true)
    } else if (cartProducts.length >= 1) {
      // Agregar cantidad si ya se agregó el elemento.
      const index = cartProducts.findIndex(product => product.name === productBought.name);
      if (index !== -1) {
        setCartProducts([...cartProducts], cartProducts[index].quantity++);
      } else {
        setCartProducts([...cartProducts, { name: productBought.name, unit_price: productBought.unit_price, quantity: 1 }])
      }
    } else {
      setCartProducts([...cartProducts, { name: productBought.name, unit_price: productBought.unit_price, quantity: 1 }])
    }

  };

  // Efecto del total
  React.useEffect(() => {
    calcTotal()
  }, [cartProducts])

  const calcTotal = () => {
    // Establecer el total
    const subTotal = cartProducts.map(item => item.quantity * item.unit_price)
    if (subTotal.length > 0) {
      setTotal(subTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    }
  }

  // Cerrar el modal
  const closeModal = () => {
    setOpenModal(false);
  }

  return (
    <ShopContext.Provider value={{
      API,
      sendToCart,
      cartProducts,
      total,
      openModal,
      closeModal
    }}>{props.children}</ShopContext.Provider>
  )
}

export { ShopContext, ShopProvider }