import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { userRegisterStartAsync } from '../../redux/user/userActions'

import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import FormContainer from '../../components/FormContainer/FormContainer'

const RegisterPage = ({history, location}) => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    message: null
  })

  const { name, email, password, confirmPassword, message } = userCredentials

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

    if(password !== confirmPassword){
      setUserCredentials({ ...userCredentials, message: 'Passwords do not match'})
    } else {
      dispatch(userRegisterStartAsync(name, email, password))
    }
  }

  const handleChange = e => {
    const {name, value} = e.target
    setUserCredentials({ ...userCredentials, [name]: value})
  }
  return (
    <FormContainer>
      <h1 className='text-center'>Sign Up</h1>
      { message && <Message variant='danger'>{message}</Message> }
      { errorMessage && <Message variant='danger'>{errorMessage}</Message> }
      { isFetching && <Loader/>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            name='name'
            value={userCredentials.name}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
         
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

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            value={userCredentials.confirmPassword}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Register</Button>
      </Form>

      <Row className='py-3'>
        <Col >
          Have an account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='ml-1'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterPage
