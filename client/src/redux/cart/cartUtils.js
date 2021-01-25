export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
      cartItem => cartItem._id === cartItemToAdd._id
  );

  if (existingCartItem) {
      return cartItems.map(cartItem => 
          cartItem._id === cartItemToAdd._id ? cartItemToAdd : cartItem    
      )
  }

  return [ ...cartItems, cartItemToAdd ]
};

export const removeItemFromCart = (cartItems, cartItemIdToRemove) => {
  const existingCartItem = cartItems.find(
      cartItem => cartItem._id === cartItemIdToRemove
  );

  if (existingCartItem){
    return cartItems.filter( cartItem => cartItem._id !== cartItemIdToRemove)
  }
}
