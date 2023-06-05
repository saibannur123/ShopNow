
export const storeReducer = (state, action) => {

    switch(action.type){
        case 'ADD_TO_CART':
            const newItem = action.payload;
            return{
                ...state,
                cart: [...state.cart, newItem],
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter((c) => c._id !== action.payload._id),
            };
        case 'SIGN_IN':
            console.log("SIGN_IN Reducer");
            return;
        case 'SIGN_OUT':
            console.log("SIGN_OUT Reducer");
            return;
        default:
            console.log("Return default state storeReducer");
            return state;
    } 
}