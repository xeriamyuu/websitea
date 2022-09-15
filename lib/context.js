import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();
export const StateContext = ({ children }) => {
  //Add our data for the state

  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //increase product quantity

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  //Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty > 1) {
        return prevQty - 1;
      }
      return prevQty;
    });
  };

  //Add product to Cart
  const onAdd = (product, quantity) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
    //Increase total quantity
    setTotalQuantities((prevTotal) => prevTotal + quantity);
    //Check if product is already in teh cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //Remove Product

  const onRemove = (product) => {
    const exist = cartItems.find((item) => item.slug === product.slug);
    setTotalQuantities((prevTotal) => prevTotal - 1);
    setTotalPrice((prevTotal) => prevTotal - product.price);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };
  return (
    <ShopContext.Provider
      value={{
        qty,
        setQty,
        increaseQty,
        decreaseQty,
        setShowCart,
        showCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        setTotalQuantities,
        setTotalPrice,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
