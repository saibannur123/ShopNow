import "./App.css";
import Navigation from "./components/Navigation";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import ProductScreen from "./screens/ProductScreen";
import Cart from "./screens/CartScreen";
import ChangePassword from "./screens/ChangePassword";
import Protected from "./components/Protected";
import Search from "./screens/Search";
import ShippingScreen from "./screens/ShippingScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login-page" element={<Login />}></Route>
          <Route path="/register-page" element={<Register />}></Route>

          <Route
            path="/change-password"
            element={
              <Protected>
                <ChangePassword />{" "}
              </Protected>
            }
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/product/:slug" element={<ProductScreen />}></Route>
          <Route path="/order/:order" element={<div>Hey</div>}></Route>
          <Route path="/shipping" element={ <Protected><ShippingScreen />{" "} </Protected>}></Route>
          <Route path="/placeorder" element={ <Protected><PlaceOrderScreen />{" "} </Protected>}></Route>
          <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
