import React from "react";
import logoAlternova from './../../styles/assets/logo-Alternova.png'

function ShopHeader() {
  return(
    <header className="header">
      <div className="header__container container">
        <img src={logoAlternova} className="header__img" alt="Logo Alternova"></img>
      </div>
    </header>
  )
};

export { ShopHeader };