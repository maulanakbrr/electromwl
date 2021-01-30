import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDetailsAsync, updateUserDetailsAsync } from '../../redux/user/userActions'

import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'

const ProfilePage = ({history, location}) => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const { isFetching, errorMessage, currentUser, userDetails, isUpdated } = user

  useEffect(() => {
    if (!currentUser){
      history.push('/login')
    } else {
      if(!userDetails) {
        dispatch(getUserDetailsAsync('profile', currentUser))
      } else {
        setName(userDetails.name)
        setEmail(userDetails.email)
      }
      
    }
  }, [dispatch, history, currentUser, userDetails])

  const handleSubmit = e => {
    e.preventDefault()

    if(password !== confirmPassword){
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserDetailsAsync({
        id: userDetails._id,
        name,
        email,
        password
      }, currentUser))
    }
  }
  
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        { message && <Message variant='danger'>{message}</Message> }
        { errorMessage && <Message variant='danger'>{errorMessage}</Message> }
        { isUpdated && <Message variant='success'>Profile Updated</Message> }
        { isFetching && <Loader/>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' >Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfilePage
