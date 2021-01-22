import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProductsStartAsync2 } from '../../redux/products/productsActions'

import ProductItem from '../../components/ProductItem/ProductItem'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'

const HomePage = () => {
  
  const dispatch = useDispatch()

  const productsList = useSelector(state => state.product)

  const { products, isFetching, errorMessage } = productsList

  useEffect(() => {
    dispatch(fetchProductsStartAsync2())
  }, [dispatch])
  
  return (
    <>
      <h1 className='text-center'>Latest Products</h1>
      {
        isFetching ? 
          <Loader/> : 
          errorMessage ? 
            <Message variant='danger'>{errorMessage}</Message> :
            <Row>
              {
                products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductItem product={product} />
                  </Col>
                ))
              }
            </Row>
      }
      
    </>
  )
}

export default HomePage
