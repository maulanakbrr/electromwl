import { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { savePaymentMethod } from '../../redux/cart/cartActions'

import FormContainer from '../../components/FormContainer/FormContainer'
import CheckoutPanel from '../../components/CheckoutPanel/CheckoutPanel'

const PaymentPage = ({ history }) => {
  const shippingAddress = useSelector(state => state.cart.shippingAddress)

  if (!shippingAddress){
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')
  
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeOrder')
  }

  return (
    <FormContainer>
      <CheckoutPanel step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address'>
          <Form.Label as='legend'>
            Select Method
          </Form.Label>
        
          <Col>
            <Form.Check 
              type='radio'
              label='Paypal or Credit Card'
              id='Paypal'
              name='paymentMethod'
              value='Paypal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check 
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        

        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentPage
