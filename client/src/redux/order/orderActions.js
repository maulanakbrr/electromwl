import OrderActionsTypes from './orderTypes'
import axios from 'axios'

export const createOrderStart = () => ({
  type: OrderActionsTypes.ORDER_CREATE_START
})

export const createOrderSuccess = order => ({
  type: OrderActionsTypes.ORDER_CREATE_SUCCESS,
  payload: order
})

export const createOrderFail = errorMessage => ({
  type: OrderActionsTypes.ORDER_CREATE_FAIL,
  payload: errorMessage
})

export const createOrderAsync = (order, currentUser) => async (dispatch) => {
  try {
    const { token } = currentUser

    dispatch(createOrderStart())

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }

    const { data } = await axios.post('/api/orders/', order,  config)

    dispatch(createOrderSuccess(data))
  } catch (error) {
    dispatch(createOrderFail(
      error.response && error.response.data.message ? error.response.data.message : error.message
    ))
  }
}