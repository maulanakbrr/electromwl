import ProductsActionTypes from './productsTypes'
import axios from 'axios'

export const fetchProductsStart = () => ({
  type: ProductsActionTypes.FETCH_PRODUCTS_START
})

export const fetchProductsSuccess = productsData => ({
  type: ProductsActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: productsData
})

export const fetchProductsFailure = errorMessage => ({
  type: ProductsActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: errorMessage
})

// promise version
export const fetchProductsStartAsync = async () => {
  return dispatch => {
    dispatch(fetchProductsStart())
    
    axios.get('/api/products')
      .then( res => dispatch(fetchProductsSuccess(res.data)))
      .catch(error => dispatch(fetchProductsFailure(
        error.response && error.response.data.message ? error.response.data.message : error.message
      )))
  }
}

// async await version
export const fetchProductsStartAsync2 = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart())

    const { data } = await axios.get('/api/products')

    dispatch(fetchProductsSuccess(data))
  } catch (error) {
    dispatch(fetchProductsFailure(
      error.response && error.response.data.message ? error.response.data.message : error.message
    ))
  }
}