import React, {useEffect, useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap'
import { Store } from '../Context/storeContext'

export default function PlaceOrderScreen() {

    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const shippingInfo = state.cart.shippingInfo;
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);



    useEffect(() => {
        if(!localStorage.getItem("shippingInfo")){
            navigate("/shipping");
        }
    }, [navigate])

    useEffect(() => {
        let calculation = 0;
        let tot;
        let tx; 
        state.cart.cartItems.map((item, index) => calculation += item.quantity * item.value.price)
        setSubTotal(calculation.toFixed(2));
        tx = (calculation * 0.13).toFixed(2);
        tot = tx + calculation;
        setTax(tx)
        setTotal(tot)
    }, [ state.cart.cartItems])


  return (
    <>

        <Container className="placeOrderScreenContainer">
            <Row>
                 <h1>Preview Order</h1>
                <Col lg={8}>
                        <div className='placeOrderShipping'>
                            <h4>Shipping</h4>
                            <span><strong>Name:</strong> {shippingInfo.name}</span><br></br>
                            <span><strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country}</span><br></br>
                            <Link to="/shipping">Edit</Link>
                        </div>
                                            
                        <div className="placeOrderItems">
                            <h4>Items</h4>
                            {
                                state.cart.cartItems.map((item, index) => 
                                (
                                <div key={index} className="placeOrderItem"> 
                                   <img src={item.value.image} alt={item.value.name} />
                                   <span><Link to={"/product/" + item.value.slug}>{item.value.name}</Link></span>
                                   <span className="placeOrderQuanPrice">{item.quantity}</span>
                                   <span className="placeOrderQuanPrice">{item.value.price}</span>
                                   <hr></hr>
                                </div>
                               
                            ))}
                        </div>
                    
                </Col>

                <Col lg={4}>
                    <div className="placeOrder">
                        <h4>Order Summary</h4>
                        <span>Items: ${subTotal}</span><hr></hr>
                        <span>Shipping: $0.00</span><hr></hr> 
                        <span>Tax: ${tax}</span> <hr></hr>
                        <span><strong>Total: {total}</strong></span><hr></hr>
                        <button>Payout</button>
                    </div>

                </Col>
            </Row>
        </Container>
        
    </>
  )
}
