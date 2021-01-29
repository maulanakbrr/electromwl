import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { userLoginStartAsync } from '../../redux/user/userActions'

import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import FormContainer from '../../components/FormContainer/FormContainer'


const LoginPage = ({history, location}) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  const { email, password } = userCredentials

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const { isFetching, errorMessage, currentUser } = user

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (currentUser){
      history.push(redirect)
    }
  }, [history, currentUser, redirect])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(userLoginStartAsync(email, password))
  }

  const handleChange = e => {
    const {name, value} = e.target
    setUserCredentials({ ...userCredentials, [name]: value})
  }

  return (
    <FormContainer>
      <h1 className='text-center'>Sign In</h1>
      { errorMessage && <Message variant='danger'>{errorMessage}</Message> }
      { isFetching && <Loader/>}
      <Form onSubmit={handleSubmit}> 
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={userCredentials.email}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            name='password'
            value={userCredentials.password}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col >
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='ml-1'>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginPage
