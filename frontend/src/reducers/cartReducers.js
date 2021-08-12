import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constrants/cartConstrants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const items = action.payload;
      const exitItem = state.cartItems.find((x) => x.product === items.product);
      if (exitItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === exitItem.product ? items : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, items],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
