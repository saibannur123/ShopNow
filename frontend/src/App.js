import './App.css';
import Navigation from './components/Navigation'
import Login from './screens/Login'
import Home from './screens/Home'
import Register from './screens/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login-page" element={<Login />}></Route>
          <Route path="/register-page" element={<Register />}></Route>

        </Routes>
    
      
      </BrowserRouter>
    </div>
  );
}

export default App;
