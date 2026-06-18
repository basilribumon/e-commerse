import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/CartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const handlePlaceOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    dispatch(addOrder(newOrder));

    dispatch(clearCart());

    alert("✅ Order Placed Successfully!");

    navigate("/orders");
  };

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Checkout</h1>
        <h2>Your Cart is Empty</h2>

        <button
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Checkout</h1>

      <h2>Order Summary</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            width="80"
            height="80"
            style={{
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />

          <div>
            <h3>{item.title}</h3>
            <p>₹{item.price}</p>
            <p>{item.category}</p>
          </div>
        </div>
      ))}

      <h2>
        Total Amount: ₹{totalPrice}
      </h2>

      <button
        onClick={handlePlaceOrder}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;