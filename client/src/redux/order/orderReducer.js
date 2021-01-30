import OrderActionsTypes from './orderTypes'

const INITIAL_STATE = {
  isFetching: false,
  order: {}
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionsTypes.ORDER_CREATE_START:
      return {
        ...state,
        isFetching: true
      }
    case OrderActionsTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        order: action.payload
      }
    case OrderActionsTypes.ORDER_CREATE_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    default:
      return state
  }
}

export default orderReducer