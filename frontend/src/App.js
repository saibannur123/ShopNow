import './App.css';
import Navigation from './components/Navigation'
import Login from './screens/Login'
import Home from './screens/Home'
import Register from './screens/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer'
import ProductScreen from './screens/ProductScreen'
import Cart from './screens/CartScreen';


function App() {
  return (
    <div className="App">
      <Navigation />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login-page" element={<Login />}></Route>
          <Route path="/register-page" element={<Register />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product/:slug" element={<ProductScreen />}></Route>
        </Routes>     
      </BrowserRouter>

      <Footer />
      
    </div>
  );
}

export default App;
