import React from 'react';
import './../../styles/App.scss';
import { ShopProvider } from '../ShopContext/ShopContext';
import { AppUI } from './AppUI';

function App() {

  return (
    <ShopProvider>
      <AppUI />
    </ShopProvider>
  );
}

export default App;
