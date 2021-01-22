import ProductDetailsActionsTypes from './productDetailsTypes'

const INITIAL_STATE = {
  product: {},
  isFetching: false,
  errorMessage: undefined
}

const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case ProductDetailsActionsTypes.FETCH_PRODUCT_DETAILS_START:
      return{
        ...state,
        isFetching: true
      }
    case ProductDetailsActionsTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
      return{
        ...state,
        isFetching: false,
        product: action.payload
      }
    case ProductDetailsActionsTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return{
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }
    default: return state 
  }
}

export default productDetailsReducer