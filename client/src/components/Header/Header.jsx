import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../../redux/user/userActions'

const Header = () => {
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user)
  const { currentUser } = user

  const handleLogout = () => {
    console.log('logout')
    dispatch(userLogout())
  }

  return (
    <header>
      <Navbar expand="lg" bg='primary' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Electromwl</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  <span> </span>
                  Cart
                </Nav.Link>
              </LinkContainer>
              {
                currentUser ? (
                  <NavDropdown title={currentUser.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : 
                (<LinkContainer to='/login'>
                  <Nav.Link>
                    <i className="fas fa-user"></i>
                    <span> </span> 
                    Sign In
                  </Nav.Link>
                </LinkContainer>)
              }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
