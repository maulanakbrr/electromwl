import ProductActionTypes from './productTypes'
import axios from 'axios'

export const fetchProductStart = () => ({
  type: ProductActionTypes.FETCH_PRODUCTS_START
})

export const fetchProductsSuccess = productsData => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: productsData
})

export const fetchProductsFailure = errorMessage => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: errorMessage
})

export const fetchProductsStartAsync = () => {
  return dispatch => {
    dispatch(fetchProductStart())
    
    axios.get('/api/products')
      .then( res => dispatch(fetchProductsSuccess(res.data)))
      .catch(error => dispatch(fetchProductsFailure(error.message)))
  }
}