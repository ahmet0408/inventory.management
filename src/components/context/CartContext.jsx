import { createContext, useState, useContext } from "react";

// Create Shopping Cart Context
const CartContext = createContext(null);

// Cart Item type:
// {
//   id: string,
//   name: string,
//   price: number,
//   quantity: number,
//   image?: string
// }

export const CartProvider = ({ children }) => {
  // Get initial cart from localStorage if it exists
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setItems(cart);
  };

  // Add item to cart
  const addItem = (itemToAdd) => {
    const existingItem = items.find((item) => item.id === itemToAdd.id);

    if (existingItem) {
      // If item exists, increase quantity
      const updatedItems = items.map((item) =>
        item.id === itemToAdd.id
          ? { ...item, quantity: item.quantity + (itemToAdd.quantity || 1) }
          : item
      );
      saveCart(updatedItems);
    } else {
      // If item doesn't exist, add new item
      saveCart([...items, { ...itemToAdd, quantity: itemToAdd.quantity || 1 }]);
    }
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    saveCart(updatedItems);
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedItems);
  };

  // Clear entire cart
  const clearCart = () => {
    localStorage.removeItem("cart");
    setItems([]);
  };

  // Calculate cart totals
  const getCartTotals = () => {
    return items.reduce(
      (totals, item) => {
        const itemTotal = item.price * item.quantity;
        return {
          itemCount: totals.itemCount + item.quantity,
          subtotal: totals.subtotal + itemTotal,
        };
      },
      { itemCount: 0, subtotal: 0 }
    );
  };

  // Check if item exists in cart
  const isItemInCart = (itemId) => {
    return items.some((item) => item.id === itemId);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotals,
    isItemInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
