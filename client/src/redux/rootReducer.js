import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import productsReducer from './products/productsReducer'
import productDetailsReducer from './productDetails/productDetailsReducer'
import cartReducer from './cart/cartReducer'
import userReducer from './user/userReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const userPersistConfig = {
  key: 'user',
  storage: storage,
  blacklist: ['errorMessage', 'isFetching']
}

const rootReducer = combineReducers({
  product: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: persistReducer(userPersistConfig, userReducer)
})

export default persistReducer(persistConfig, rootReducer)