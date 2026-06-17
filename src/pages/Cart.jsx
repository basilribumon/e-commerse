import { useSelector } from "react-redux";

function Cart(){
    const cartItems = useSelector((state)=>state.cart.cartItems);



    return (
        <div style={{padding:"20px"}}>
            <h1>Cart Items</h1>

            {cartItems.length===0 ? (
                <h2>Cart is empty</h2>
            ) :(
                cartItems.map((item)=>(
                    <div style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}> <img src="item.image" alt="item.title" width="100" />

            <h3>{item.title}</h3>
            <p>₹{item.price}</p>

            <p>Quantity: {item.quantity}</p>

                    </div>
                ))
            )}
        </div>
    )
}

export default Cart;