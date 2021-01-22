import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Image, ListGroup, Card, Breadcrumb, Button, Form } from 'react-bootstrap'

import { fetchProductDetailStartAsync } from '../../redux/productDetails/productDetailsActions'

import Rating from '../../components/Rating/Rating'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'

import { BreadcrumbCustom } from './ProductDetailsPage.styles'

const ProductDetailsPage = ({ history, match }) => {
  const [qty, setQty] = useState(0)
  
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)

  const { product, isFetching, errorMessage} = productDetails
  
  useEffect(() => {
    dispatch(fetchProductDetailStartAsync(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <div>
      <BreadcrumbCustom>
        <LinkContainer to='/'>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to='/products'>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </LinkContainer>
        {
          isFetching ? 
            <Breadcrumb.Item active className='text-muted'>Loading Item...</Breadcrumb.Item> :
            errorMessage ?
              <Breadcrumb.Item active className='text-danger'>Item Not Found</Breadcrumb.Item> :
              <Breadcrumb.Item active className='text-success'>{product.name}</Breadcrumb.Item>
        }
      </BreadcrumbCustom>
      {
        isFetching ?
          <Loader/> :
          errorMessage ?
            <Message variant='danger'>{errorMessage}</Message> :
            <Row> 
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: ${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Price:
                        </Col>
                        <Col>
                          <strong>$ {product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                          {product.countInStock > 0 ? 'Available' : 'Out of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {
                      product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Control as='select' value={qty} onChange={ (e) => 
                                setQty(e.target.value)
                              }>
                                {
                                  [...Array(product.countInStock).keys()].map( x => (
                                    <option key={x + 1} value={x + 1}>{x+1}</option>
                                  ))
                                }
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    }
                    <ListGroup.Item>
                      <Button className='btn-block' type='button' disabled={
                        product.countInStock === 0
                      } onClick={addToCartHandler}>
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
      }
      
    </div>
  )
}

export default ProductDetailsPage