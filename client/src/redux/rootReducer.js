import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import productsReducer from './products/productsReducer'
import productDetailsReducer from './productDetails/productDetailsReducer'
import cartReducer from './cart/cartReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  product: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

export default persistReducer(persistConfig, rootReducer)