import { combineReducers } from 'redux'
import productsReducer from './products/productsReducer'
import productDetailsReducer from './productDetails/productDetailsReducer'

const rootReducer = combineReducers({
  product: productsReducer,
  productDetails: productDetailsReducer
})

export default rootReducer