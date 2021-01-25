import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Container } from 'react-bootstrap';
import { persistor } from './redux/store'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage'
import CartPage from './pages/CartPage/CartPage'

function App() {
  return (
    <Router>
      <PersistGate persistor={ persistor }>
        <Header/>
        <main className='py-3'>
          <Container>
            <Switch>
              <Route path='/' exact component={HomePage}/>
              <Route path='/product/:id' component={ProductDetailsPage}/>
              <Route path='/cart/:id?' component={CartPage}/>
            </Switch>
          </Container>
        </main>
        <Footer/> 
      </PersistGate>
    </Router>
  );
}

export default App;
