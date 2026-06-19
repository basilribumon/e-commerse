import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { addOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/CartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector(
    (state) => state.cart
  );
  const [address, setAddress] = useState({
  name: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
});

const [paymentMethod, setPaymentMethod] =
  useState("Cash on Delivery");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );
  const { user } = useSelector(
  (state) => state.auth
);

  const handlePlaceOrder = () => {
    const newOrder = {
  id: Date.now(),
  items: cartItems,
  total: totalPrice,
  date: new Date().toLocaleString(),
  address,
  paymentMethod,
  status: "Order Confirmed",
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
  const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
};

return (
  <div
    style={{
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      padding: "30px",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      🛒 Checkout
    </h1>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "2fr 1fr",
        gap: "25px",
      }}
    >
      {/* Left Side */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>
          📦 Order Summary
        </h2>

        {cartItems.map(
          (item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "15px",
                alignItems:
                  "center",
                padding: "10px",
                marginTop:
                  "10px",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <img
                src={
                  item.image
                }
                alt={
                  item.title
                }
                width="80"
                height="80"
                style={{
                  borderRadius:
                    "8px",
                }}
              />

              <div>
                <h3>
                  {
                    item.title
                  }
                </h3>

                <p>
                  ₹
                  {
                    item.price
                  }
                </p>

                <p>
                  {
                    item.category
                  }
                </p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Right Side */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>
          📍 Delivery Address
        </h2>

        <div
          style={{
            background:
              "#f5f5f5",
            padding: "10px",
            borderRadius:
              "8px",
            marginBottom:
              "15px",
          }}
        >
          👤 Customer:
          <strong>
            {" "}
            {user?.name}
          </strong>
        </div>

        <input
          type="text"
          placeholder="📞 Phone Number"
          value={
            address.phone
          }
          onChange={(e) =>
            setAddress({
              ...address,
              phone:
                e.target
                  .value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="🏠 Address"
          value={
            address.address
          }
          onChange={(e) =>
            setAddress({
              ...address,
              address:
                e.target
                  .value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="🏙️ City"
          value={
            address.city
          }
          onChange={(e) =>
            setAddress({
              ...address,
              city:
                e.target
                  .value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="📮 Pincode"
          value={
            address.pincode
          }
          onChange={(e) =>
            setAddress({
              ...address,
              pincode:
                e.target
                  .value,
            })
          }
          style={inputStyle}
        />

        <h2>
          💳 Payment Method
        </h2>

        <select
          value={
            paymentMethod
          }
          onChange={(e) =>
            setPaymentMethod(
              e.target
                .value
            )
          }
          style={inputStyle}
        >
          <option>
            Cash on Delivery
          </option>

          <option>
            UPI
          </option>

          <option>
            Credit Card
          </option>

          <option>
            Debit Card
          </option>
        </select>

        <hr />

        <h2
          style={{
            color: "green",
          }}
        >
          Total: ₹
          {totalPrice}
        </h2>

        <button
          onClick={
            handlePlaceOrder
          }
          style={{
            width: "100%",
            padding:
              "12px",
            background:
              "#131921",
            color:
              "white",
            border:
              "none",
            borderRadius:
              "8px",
            cursor:
              "pointer",
            fontSize:
              "16px",
          }}
        >
          ✅ Place Order
        </button>
      </div>
    </div>
  </div>
);
}

export default Checkout;