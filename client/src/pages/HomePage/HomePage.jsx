import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { fetchProductsStartAsync } from '../../redux/product/productActions'

import Product from '../../components/Product/Product'

const HomePage = () => {
  
  const dispatch = useDispatch()

  const productsList = useSelector(state => state.product)

  const { products, isFetching, errorMessage } = productsList

  useEffect(() => {
    dispatch(fetchProductsStartAsync())
  }, [dispatch])
  
  return (
    <>
      <h1>Latest Products</h1>
      {
        isFetching ? 
          <h2>Loading...</h2> : 
          errorMessage ? 
            <h3>{errorMessage}</h3> :
            <Row>
              {
                products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
              }
            </Row>
      }
      
    </>
  )
}

export default HomePage
