import React from "react";
import { useLocalStorage } from "./useLocalStorage";
// import Cart from "./../../cartList.json"

const ShopContext = React.createContext();
const API = 'http://localhost:3004/products';
const APICart = 'http://localhost:3005/products';


function ShopProvider(props) {
  // LocalStorage
  const {value, saveLocal} = useLocalStorage('PRODUCTS_V1', []);

  // Estados
  const [productsList, setProductsList] = React.useState([])
  const [cartProducts, setCartProducts] = React.useState([])
  const [total, setTotal] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);

  // Efecto
  React.useEffect(() => {
    calcTotal()
  }, [cartProducts]);

  React.useEffect(() => {
    getProducts()
  }, [])

  // Get
  const getProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();

    setProductsList(data)
  }

  // Agregar producto a Cart y quitar de stock
  const sendToCart = async (productName) => {
    // Encontrar el producto
      const productIndex = productsList.findIndex(item => item.name === productName);
      const productBought = productsList[productIndex];

      const res = await fetch(`${API}/${productBought.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          stock: productBought.stock - 1
        })
      });
      const data = await res.json();
      getProducts();

      // Eliminar y comprobar la cantidad del stock
      if (data.stock < 0) {
        setOpenModal(true)
      } else if (cartProducts.length >= 1) {
        // Agregar cantidad si ya se agregó el elemento.
        const index = cartProducts.findIndex(product => product.name === productBought.name);
        if (index !== -1) {
          setCartProducts([...cartProducts], cartProducts[index].quantity++);
          console.log('Ya existía')
        } else {
          setCartProducts([...cartProducts, { name: productBought.name, unit_price: productBought.unit_price, quantity: 1 }])
          console.log('No existía')
        }
      } else {
        setCartProducts([{ name: productBought.name, unit_price: productBought.unit_price, quantity: 1 }])
        console.log('La lista estaba vacía y No existía', cartProducts)
      }
  }

  // Eliminar producto del carrito
  const removeItem = async(productName) => {
    const productIndex = productsList.findIndex(item => item.name === productName);
    const productBought = productsList[productIndex];

    const res = await fetch(`${API}/${productBought.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        stock: productBought.stock + 1
      })
    });
    const data = await res.json();
    getProducts();

    setCartProducts(cartProducts.filter(element => element.name !== productName))
  }

  // Establecer el total
  const calcTotal = () => {
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
      productsList,
      sendToCart,
      removeItem,
      cartProducts,
      total,
      openModal,
      closeModal
    }}>{props.children}</ShopContext.Provider>
  )
}

export { ShopContext, ShopProvider }