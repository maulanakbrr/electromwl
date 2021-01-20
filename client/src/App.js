import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import ProductPage from './pages/ProductPage/ProductPage'

import './bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/product/:id' component={ProductPage}/>
          </Switch>
        </Container>
      </main>
      <Footer/> 
    </Router>
  );
}

export default App;
