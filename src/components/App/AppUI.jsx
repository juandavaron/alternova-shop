import React from "react";
import { ShopContext } from "../ShopContext/ShopContext";
import { ShopFooter } from "../ShopFooter/ShopFooter";
import { ShopHeader } from "../ShopHeader/ShopHeader";
import { ShopMain } from "../ShopMain/ShopMain";
import { ShopModal } from "../ShopModal/ShopModal";

function AppUI() {

  const { openModal } = React.useContext(ShopContext);

  return (
    <React.Fragment>
      <ShopHeader />
      <ShopMain />
      <ShopFooter />
      {openModal && (
        <ShopModal />
      )}
    </React.Fragment>
  )
};

export { AppUI }