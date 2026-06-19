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

const [errors, setErrors] = useState({
  phone: "",
  address: "",
  city: "",
  pincode: "",
});

const [paymentMethod, setPaymentMethod] =
  useState("Cash on Delivery");

  const validateField = (name, value) => {
  let error = "";

  switch (name) {
    case "phone":
      if (!value.trim()) {
        error = "Phone number is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Phone number must be 10 digits";
      }
      break;

    case "address":
      if (!value.trim()) {
        error = "Address is required";
      }
      break;

    case "city":
      if (!value.trim()) {
        error = "City is required";
      } else if (!/^[A-Za-z ]+$/.test(value)) {
        error = "City should contain only letters";
      }
      break;

    case "pincode":
      if (!value.trim()) {
        error = "Pincode is required";
      } else if (!/^\d{6}$/.test(value)) {
        error = "Pincode must be 6 digits";
      }
      break;

    default:
      break;
  }

  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));

  return error;
};

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );
  const { user } = useSelector(
  (state) => state.auth
);

const handlePlaceOrder = () => {
  const phoneError = validateField(
    "phone",
    address.phone
  );

  const addressError = validateField(
    "address",
    address.address
  );

  const cityError = validateField(
    "city",
    address.city
  );

  const pincodeError = validateField(
    "pincode",
    address.pincode
  );

  if (
    phoneError ||
    addressError ||
    cityError ||
    pincodeError
  ) {
    return;
  }

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
  maxLength={10}
  placeholder="📞 Phone Number"
  value={address.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");

    setAddress({
      ...address,
      phone: value,
    });

    validateField("phone", value);
  }}
  style={inputStyle}
/>

{errors.phone && (
  <p style={{ color: "red" }}>
    {errors.phone}
  </p>
)}






        <input
  type="text"
  placeholder="🏠 Address"
  value={address.address}
  onChange={(e) => {
    const value = e.target.value;

    setAddress({
      ...address,
      address: value,
    });

    validateField(
      "address",
      value
    );
  }}
  style={inputStyle}
/>

{errors.address && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-8px",
      marginBottom: "10px",
    }}
  >
    {errors.address}
  </p>
)}

        <input
  type="text"
  placeholder="🏙️ City"
  value={address.city}
  onChange={(e) => {
    const value =
      e.target.value;

    setAddress({
      ...address,
      city: value,
    });

    validateField(
      "city",
      value
    );
  }}
  style={inputStyle}
/>

{errors.city && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-8px",
      marginBottom: "10px",
    }}
  >
    {errors.city}
  </p>
)}

        <input
  type="text"
  maxLength={6}
  placeholder="📮 Pincode"
  value={address.pincode}
  onChange={(e) => {
    const value =
      e.target.value.replace(
        /\D/g,
        ""
      );

    setAddress({
      ...address,
      pincode: value,
    });

    validateField(
      "pincode",
      value
    );
  }}
  style={inputStyle}
/>

{errors.pincode && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-8px",
      marginBottom: "10px",
    }}
  >
    {errors.pincode}
  </p>
)}

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