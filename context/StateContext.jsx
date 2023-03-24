import React, { useContext, createContext, useState } from 'react'

const Context = createContext();

export const StateContext = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleShowCart = () => {
    setShowCart((showCart) => !showCart);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1)  return 1;
      else {
        return prevQty - 1;
      }
    });
  };

  const addToCart = (product, quantity) => {
    const checkItemInCart = cartItems.find((item) => item?._id === product._id); 

    setTotalQuantities((prev) => prev + quantity);
    setTotalPrice((prev) => prev + quantity * product.price);

    if (checkItemInCart) {
      const updatedCartItems = cartItems?.map((item) => {
        if (item?._id === product._id) {
          return {
            ...item, quantity : item.quantity + quantity
          }
        }
      });
    
      setCartItems(updatedCartItems);
    }
    else {
      product.quantity = quantity;

      setCartItems([ ...cartItems, {...product}]);
    };
  
  };

  const handleToggleCartQuantity = (id, value) => {
    const findProductById = cartItems?.find((item) => item._id === id);

    if (value === "inc") {
      setTotalQuantities((prev) => prev + 1);
      findProductById.quantity = findProductById.quantity + 1;

      setTotalPrice((prev) => prev + findProductById.price);
    }  else if (value === "dec") {
      if (findProductById.quantity <= 1)  removeItem(id);

      setTotalQuantities((prev) => prev - 1);
      findProductById.quantity = findProductById.quantity - 1;

      setTotalPrice((prev) => prev - findProductById.price);
  };
}

  const removeItem = (id) => {
    const foundItem = cartItems?.find((item) => item._id === id);
    const newCartItems = cartItems?.filter((item) => item._id !== id);
  
    setTotalQuantities((prev) => prev - foundItem.quantity);
    setTotalPrice((prev) => prev - foundItem.quantity * foundItem.price);
    setCartItems(newCartItems);
  };

  return (
    <Context.Provider  value={{
      qty,
      totalPrice,
      showCart,
      totalQuantities,
      handleShowCart,
      cartItems,
      setShowCart,
      decQty, 
      removeItem,
      incQty,
      addToCart,
      handleToggleCartQuantity
    }}
    >
        {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context); 
