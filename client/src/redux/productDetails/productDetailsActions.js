import ProductDetailsActionsTypes from './productDetailsTypes'
import axios from 'axios'

export const fetchProductDetailStart = () => ({
  type: ProductDetailsActionsTypes.FETCH_PRODUCT_DETAILS_START
})

export const fetchProductDetailSuccess = productData => ({
  type: ProductDetailsActionsTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: productData
})

export const fetchProductDetailFailure = errorMessage => ({
  type: ProductDetailsActionsTypes.FETCH_PRODUCT_DETAILS_FAILURE,
  payload: errorMessage
})

export const fetchProductDetailStartAsync = id => {
  return dispatch => {
    dispatch(fetchProductDetailStart())
    
    axios.get(`/api/products/${id}`)
      .then( res => dispatch(fetchProductDetailSuccess(res.data)))
      .catch(error => dispatch(fetchProductDetailFailure(
        error.response && error.response.data.message ? error.response.data.message : error.message
      )))
  }
}