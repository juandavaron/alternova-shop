import React from "react";

function useLocalStorage(storageName, initialValue) {

  // Estado
  const [value, setValue] = React.useState(initialValue)

  // Efecto
  React.useEffect(() => {
    const localStorageGet = localStorage.getItem(storageName);

    let storageItem;
    if (!localStorageGet) {
      // Si no existe lo crea
      localStorage.setItem(storageName, JSON.stringify(initialValue))
      storageItem = initialValue;
    } else {
      // Si existe lo parsea y lo guarda.
      storageItem = JSON.parse(localStorageGet);
    }

    setValue(storageItem)
  }, []);

  // Guardar en el LocalStorage
  const saveLocal = (newItem) => {
    const item = JSON.stringify(newItem);
    localStorage.setItem(storageName, item);

    setValue([...value, newItem]);
  }


  // Regresa un objeto con estados
  return {
    value,
    saveLocal
  }
};

export { useLocalStorage }