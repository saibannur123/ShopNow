import React, {useEffect, useContext, useState, useReducer} from "react";
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Store } from "../Context/storeContext";

const reducer = (state, action) => {
    
    switch(action.type){
        case "ORDER_REQUEST":
            console.log("ORDER_REQUEST")
            return {...state, loader: true}
        case "ORDER_SUCCESS":
            console.log("ORDER_SUCCESS")
            return {...state, order: action.payload, loader: false}
        case "ORDER_ERROR":
            return {...state, loader: false, error: action.payload}
        default:
            return state;
    }
}

export default function OrderScreen() {

    const orderId = useParams().order
    const {state: stxte, dispatch: dxspatch} = useContext(Store);
    const [orderInfo, setOrderInfo] = useState("");
    const [state, dispatch] = useReducer(reducer, { 
        loader: true,
        order: {},
        error: '',
    });
   
    useEffect( () => {
        const fetchOrder = async () => {
            dispatch({type: "ORDER_REQUEST"})
            try{         
                const result = await axios.get(`http://localhost:3019/api/orders/${orderId}`,{ headers: {authorization: `Bearer ${stxte.userInfo.token}`}})
                console.log("Result", result.data.order)
                dispatch({type: "ORDER_SUCCESS", payload: result.data.order})

            }catch(err){
                dispatch({type: "ORDER_ERROR", payload: err})
                alert("Error fetch order");
            }
        }
        fetchOrder();
    }, [orderId, stxte.userInfo])


    const payOrder = async () => {
        console.log("HERE")
        try{
        const result = await axios.post(`http://localhost:3019/api/orders/${orderId}/payment`, {}, { headers: {authorization: `Bearer ${stxte.userInfo.token}`}})
       
        if(result.status === 200){
            //  const updatePaid = await axios.post(`http://localhost:3019/api/orders/${orderId}/paid`, {url: result.data.url}, { headers: {authorization: `Bearer ${stxte.userInfo.token}`}})
            // if(updatePaid.status === 200){
                // console.log("success", result)
                window.location.href = result.data.url
            // }else{
            //     console.log("Faield to update", updatePaid.data.error);
            //     window.location.href = result.data.url;
            // }
            // console.log("RESL", result);

        }else{
            console.log("Fail", result)
        }


        }catch(err){
            console.log("ERR", err)
        }
    }


  return (
<>
   { state.loader ? <div>Loading</div> : <Container className="orderScreen">
        <Row>
            <h1>Order {state.order[0]._id}</h1>
            <Col lg={8}>
    
                <div className='placeOrderShipping'>
                    <h4>Shipping</h4>
                    <span><strong>Name:</strong> {state.order[0].shippingInfo.name}</span><br></br>
                    <span><strong>Address:</strong> {state.order[0].shippingInfo.address}, {state.order[0].shippingInfo.city}, {state.order[0].shippingInfo.postalCode}, {state.order[0].shippingInfo.country}</span><br></br>
                    <span><strong>Delivered:</strong> {state.order[0].isDelivered ? <span>True</span> : <span>False</span>}</span> <br></br>
                    <span><strong>Paid:</strong> {state.order[0].isPaid ? <span>True</span> : <span>False</span>}</span>

                </div>

                <div className="placeOrderItems">
                            <h4>Items</h4>
                            {
                                state.order[0].orderItems.map((item, index) => 
                                (
                                <div key={index} className="placeOrderItem"> 
                                   <img src={item.image} alt={item.name} />
                                   <span><Link to={"/product/" + item.slug}>{item.name}</Link></span>
                                   <span className="placeOrderQuanPrice">{item.quantity}</span>
                                   <span className="placeOrderQuanPrice">${item.price}</span>
                                   <hr></hr>
                                </div>
                               
                            ))}
                        </div>
            </Col>

            <Col lg={4}>

                <div className="placeOrder">
                    <h4>Order Summary</h4>
                    <span>Items: ${(state.order[0].itemsPrice).toFixed(2)}</span><hr></hr>
                    <span>Shipping: $0.00</span><hr></hr> 
                    <span>Tax: ${state.order[0].taxPrice}</span> <hr></hr>
                    <span><strong>Total: ${state.order[0].totalPrice}</strong></span><hr></hr>
                    {/* {stxte.cart.cartItems.length == 0 ? <button disabled>Payout</button> : <button onClick={createPayout}>Payout</button> }  */}
                   { state.order[0].isPaid ? "" : <button onClick={payOrder}>Pay with Stripe</button> }
                </div>
                

            </Col>
        </Row>
    </Container>
}
</>

  )
}
