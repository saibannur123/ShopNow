export const storeReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            return;
        case 'REMOVE_FROM_CART':
            return;
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