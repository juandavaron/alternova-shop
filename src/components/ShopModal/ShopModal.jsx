import React from "react";
import ReactDOM from "react-dom"
import { AiOutlineCloseSquare } from "react-icons/ai"
import { ShopContext } from "../ShopContext/ShopContext";

function ShopModal() {

  const { closeModal } = React.useContext(ShopContext)

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__container">
        <AiOutlineCloseSquare className="modal__btn" onClick={closeModal}></AiOutlineCloseSquare>
        <p>Sorry, we don't have that product in stock</p>
      </div>
    </div>,
    document.getElementById('modal')
  )
}

export { ShopModal }