import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('fk_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedForLater, setSavedForLater] = useState(() => {
    const saved = localStorage.getItem('fk_saved_for_later');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('fk_saved_for_later', JSON.stringify(savedForLater));
  }, [savedForLater]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const saveForLater = (productId) => {
    const itemToSave = cartItems.find(item => item.product.id === productId);
    if (itemToSave) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
      setSavedForLater(prev => {
        if (!prev.some(it => it.product.id === productId)) {
          return [...prev, itemToSave];
        }
        return prev;
      });
    }
  };

  const moveToCart = (productId) => {
    const itemToMove = savedForLater.find(item => item.product.id === productId);
    if (itemToMove) {
      setSavedForLater(prev => prev.filter(item => item.product.id !== productId));
      addToCart(itemToMove.product, itemToMove.quantity || 1);
    }
  };

  const removeFromSavedForLater = (productId) => {
    setSavedForLater(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalDiscount = totalOriginalPrice - totalPrice;
  const deliveryCharges = totalPrice >= 500 || totalPrice === 0 ? 0 : 40;
  const packagingFee = cartItems.length > 0 ? 59 : 0;
  const finalTotal = totalPrice + deliveryCharges + packagingFee;
  const totalSavings = totalDiscount + (totalPrice >= 500 && cartItems.length > 0 ? 40 : 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedForLater,
        itemCount,
        totalOriginalPrice,
        totalPrice,
        totalDiscount,
        deliveryCharges,
        packagingFee,
        finalTotal,
        totalSavings,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCart,
        removeFromSavedForLater,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
