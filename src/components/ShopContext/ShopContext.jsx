import React from "react";
// import { useLocalStorage } from "./useLocalStorage";

const ShopContext = React.createContext();
const API = 'http://localhost:3004/products';
const APICart = 'http://localhost:3005/products';
const APITotal = 'http://localhost:3005/total';


function ShopProvider(props) {
  // LocalStorage
  // const {saveLocal, value} = useLocalStorage('PRODUCTS_V1', []);

  // Estados
  const [productsList, setProductsList] = React.useState([])
  const [cartProducts, setCartProducts] = React.useState([])
  const [total, setTotal] = React.useState(0);
  const [check, setCheck] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  // Efecto
  React.useEffect(() => {
    calcTotal()
  }, [cartProducts, cartProducts.quantity]);

  React.useEffect(() => {
    getProducts()
  }, [])

  // Obtener productos del API
  const getProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();

    setProductsList(data)
  }

  // Agregar producto a Cart y quitar de stock
  const sendToCart = async (product) => {
    // Encontrar el producto
    const productIndex = productsList.findIndex(item => item.name === product.name);
    const productBought = productsList[productIndex];

    // Quitar de stock
    const res = await fetch(`${API}/${productBought.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stock: productBought.stock - 1
      })
    });
    const data = await res.json();
    getProducts();

    // Comprobar la cantidad del stock y agregar al carrito
    if (data.stock < 0) {
      setOpenModal(true)
    } else if (cartProducts.length >= 1) {
      // Agregar cantidad si ya se agregó el elemento.
      const index = cartProducts.findIndex(product => product.name === productBought.name);
      if (index !== -1) {
        setCartProducts([...cartProducts], cartProducts[index].quantity++);
        // saveLocal(cartProducts)
      } else {
        setCartProducts([...cartProducts, { id: productBought.id, name: productBought.name, unit_price: productBought.unit_price, quantity: 1 }])
        // saveLocal(cartProducts)
      }
    } else {
      setCartProducts([{ id: productBought.id, name: productBought.name, unit_price: productBought.unit_price, quantity: 1 }])
      // saveLocal(cartProducts)
    }
  }

  // Eliminar producto del carrito
  const removeItem = async (product) => {
    const productIndex = productsList.findIndex(item => item.name === product.name);
    const productBought = productsList[productIndex];

    // Agregar stock
    const res = await fetch(`${API}/${productBought.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stock: productBought.stock + 1
      })
    });
    const data = await res.json();
    getProducts();

    // Comprueba si hay elementos y quita de stock
    if (product.quantity === 1) {
      setCartProducts(cartProducts.filter(element => element.name !== product.name))
      // saveLocal(cartProducts)
    } else {
      product.quantity--;
    }
  }

  // Establecer el total
  const calcTotal = () => {
    const subTotal = cartProducts.map(item => item.unit_price * item.quantity)

    if (cartProducts.length > 0) {
      setTotal(subTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    } else {
      setTotal(0);
    }
  }

  // Cerrar el modal
  const closeModal = () => {
    setOpenModal(false);
  }

  // Crear la orden
  const createCart = async () => {

    if (cartProducts !== []) {
      const productsAPI = await fetch(APICart, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartProducts)
      });
      const totalAPI = await fetch(APITotal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: total })
      });

      setCartProducts([]);
      setTotal(0);
      setCheck(true);
    } else {
      console.log('No se pudo enviar')
    }

  }

  return (
    <ShopContext.Provider value={{
      productsList,
      sendToCart,
      removeItem,
      cartProducts,
      total,
      openModal,
      closeModal,
      calcTotal,
      createCart,
      check
      // value
    }}>{props.children}</ShopContext.Provider>
  )
}

export { ShopContext, ShopProvider }