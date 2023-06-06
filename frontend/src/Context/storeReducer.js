
export const storeReducer = (state, action) => {

    switch(action.type){
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);

            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem]
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            return{
                 ...state, cart: { ...state.cart, cartItems }
            }
        case 'REMOVE_FROM_CART': {
            const cartItems = state.cart.cartItems.filter(
              (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
          }

        case 'SIGN_IN': 
            return {...state, userInfo: action.payload};
        case 'SIGN_OUT':
            console.log("SIGN_OUT Reducer");
            return {...state, userInfo: null }
        default:
            console.log("Return default state storeReducer");
            return state;
    } 
}