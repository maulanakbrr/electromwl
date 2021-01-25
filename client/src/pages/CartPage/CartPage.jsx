import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import { addToCart, cartRemoveItem } from '../../redux/cart/cartActions'

import Message from '../../components/Message/Message'

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id
  
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  useEffect(() => {
    if (productId){
      dispatch(addToCart(productId, qty))
    }
  },[dispatch, productId, qty])

  const removeFromCartHandler = itemId => {
    dispatch(cartRemoveItem(itemId))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {
            cartItems.length === 0 ? 
              <Message>
                Your cart is empty 
                <Link to='/'> Go Back</Link>
              </Message> :
              <ListGroup variant='flush'>
                {
                  cartItems.map(item => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                        <Col md={3}>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>
                          {item.price}
                        </Col>
                        <Col md={3}>
                          <Form.Control as='select' value={item.qty} onChange={ (e) => 
                            dispatch(addToCart(item._id, Number(e.target.value)))
                          }>
                            {
                              [...Array(item.countInStock).keys()].map( x => (
                                <option key={x + 1} value={x + 1}>{x+1}</option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}>
                              <i className='fas fa-trash'></i>
                            </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                Total: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={
                  checkoutHandler
                }>
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartPage
