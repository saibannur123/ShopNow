export const storeReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        console.log("State", state)
        const newItem = action.payload;
        const existItem = state.cart.cartItems.find(
          (item) => item.value._id === newItem.value._id
        );
        console.log("newItem", newItem)
        console.log("existItem", existItem)
        console.log("cartItems", state.cart.cartItems)
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
        const cartItems = state.cart.cartItems.filter(
          (item) => item.value._id !== action.payload.value._id
        );
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      
      case "SIGN_IN":
        return { ...state, userInfo: action.payload };
      case "SIGN_OUT":
        console.log("SIGN_OUT Reducer");
        return { ...state, userInfo: null };
      default:
        console.log("Return default state storeReducer");
        return state;
    }
  };
  