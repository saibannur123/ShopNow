import React, {useState} from 'react'

export default function ShippingScreen() {

    const localInfo = JSON.parse(localStorage.getItem("shippingInfo"));
   // console.log("n", n);
    const [name, setName] = useState(localInfo ? localInfo.name :  "");
    const [address, setAddress] = useState(localInfo ? localInfo.address :  "");
    const [city, setCity] = useState(localInfo ? localInfo.city :  "");
    const [postalCode, setPostalCode] = useState(localInfo ? localInfo.postalCode :  "");
    const [country, setCountry] = useState(localInfo ? localInfo.country :  "");

    const validateShipping = () => {
        if(name == ""){
            alert("Enter name")
        }else if(address == ""){
            alert("Enter address")

        }else if(city == ""){
            alert("Enter city")

        }else if(postalCode == ""){
            alert("Enter postal code")

        }else if(country == ""){
            alert("Enter country")
        }else{
            const shippingInfo = {name, address, city, postalCode, country};
            localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
        }

    }


  return (
    <div className="shippingScreenContainer">
    
        <h2>Shipping Address</h2><br></br>

        <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/> <br></br> <br></br>
        <input placeholder="Address" value={address}  onChange={(e) => setAddress(e.target.value)} /> <br></br> <br></br>
        <input placeholder="City"  value={city} onChange={(e) => setCity(e.target.value)} /> <br></br> <br></br>
        <input placeholder="Postal Code"  value={postalCode} onChange={(e) => setPostalCode(e.target.value)}  /> <br></br> <br></br>
        <input placeholder="Country"  value={country} onChange={(e) => setCountry(e.target.value)} /> <br></br> <br></br>
        <button onClick={() => validateShipping()}>Continue</button>
  
    </div>
  )
}
