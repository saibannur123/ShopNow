export const storeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Add an item to the cart or update the quantity if it already exists
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.value._id === newItem.value._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.value._id === existItem.value._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    case "REMOVE_FROM_CART": {
      // Remove an item from the cart
      const cartItems = state.cart.cartItems.filter(
        (item) => item.value._id !== action.payload.value._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CLEAR_CART": {
      // Clear all items from the cart
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case "SIGN_IN":
      // Set user information when signing in
      return { ...state, userInfo: action.payload };
    case "SIGN_OUT":
      // Clear user information and cart when signing out
      console.log("SIGN_OUT Reducer");
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingInfo: {} },
      };
    case "ADD_SHIPPING_ADDRESS":
      // Add the shipping address to the cart
      return {
        ...state,
        cart: { ...state.cart, shippingInfo: action.payload },
      };
    default:
      // Return the default state when an unknown action is received
      console.log("Return default state storeReducer");
      return state;
  }
};
