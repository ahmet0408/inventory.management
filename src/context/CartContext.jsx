import { createContext, useState, useContext, useEffect } from "react";

// Create Shopping Cart Context
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage
  const [items, setItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setItems(cart);
  };

  // Modify addItem to show success notification
  const addItem = (itemToAdd) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === itemToAdd.id
      );

      if (existingItem) {
        return currentItems;
      } else {
        // Show success notification
        const notification = document.createElement("div");
        notification.className =
          "alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3";
        notification.role = "alert";
        notification.innerHTML = `
        <strong>Haryt sebede goşuldy!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.remove();
        }, 3000);

        return [...currentItems, { ...itemToAdd, quantity: 1 }];
      }
    });
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

  // Update the isItemInCart function to be more robust
  const isItemInCart = (itemId) => {
    return items.some((item) => item.id === itemId);
  };

  // Sync localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

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
