import axios from 'axios'
import CartActionTypes from './cartTypes'

export const cartAddItem = item => ({
  type: CartActionTypes.CART_ADD_ITEM,
  payload: item
})

export const cartRemoveItem = itemId => ({
  type: CartActionTypes.CART_REMOVE_ITEM,
  payload: itemId
})

export const addToCart = (id, qty) => async (dispatch) => {
  const { data } = await axios(`/api/products/${id}`)

  dispatch(cartAddItem({
    _id: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty
  }))
}
