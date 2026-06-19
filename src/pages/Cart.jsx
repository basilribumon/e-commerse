import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  removeFromCart,
} from "../redux/slices/CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } =
    useSelector(
      (state) => state.cart
    );

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total + item.price,
      0
    );

  const handleBuyAll = () => {
    alert(
      "Order Placed Successfully!"
    );

    navigate("/checkout");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor:
          "#f0f8ff",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#131921",
          marginBottom: "30px",
        }}
      >
        🛒 Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          <h2>
            Your Cart is Empty
          </h2>

          <button
            onClick={() =>
              navigate("/")
            }
            style={{
              padding:
                "12px 20px",
              border: "none",
              borderRadius:
                "10px",
              background:
                "#131921",
              color:
                "white",
              cursor:
                "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cartItems.map(
            (item) => (
              <div
                key={item.id}
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: "20px",
                  background:
                    "linear-gradient(135deg,#ffffff,#d6ecff)",
                  borderRadius:
                    "15px",
                  padding:
                    "15px",
                  marginBottom:
                    "15px",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={
                    item.image
                  }
                  alt={
                    item.title
                  }
                  width="110"
                  height="110"
                  style={{
                    objectFit:
                      "contain",
                    borderRadius:
                      "10px",
                    background:
                      "white",
                    padding:
                      "5px",
                  }}
                />

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      margin:
                        "0 0 10px 0",
                    }}
                  >
                    {
                      item.title
                    }
                  </h3>

                  <h2
                    style={{
                      color:
                        "#0077ff",
                    }}
                  >
                    ₹
                    {
                      item.price
                    }
                  </h2>

                  <p
                    style={{
                      color:
                        "#555",
                    }}
                  >
                    {
                      item.description
                    }
                  </p>
                </div>

                <button
                  onClick={() => {
                    dispatch(
                      removeFromCart(
                        item.id
                      )
                    );

                    alert(
                      "❌ Item removed from cart"
                    );
                  }}
                  style={{
                    background:
                      "#ff4d4f",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px 15px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            )
          )}

          {/* Summary */}

          <div
            style={{
              marginTop:
                "30px",
              background:
                "white",
              padding:
                "20px",
              borderRadius:
                "15px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.08)",
              textAlign:
                "center",
            }}
          >
            <h2>
              Total Amount
            </h2>

            <h1
              style={{
                color:
                  "#0077ff",
              }}
            >
              ₹{totalPrice}
            </h1>

            <button
              onClick={
                handleBuyAll
              }
              style={{
                marginTop:
                  "15px",
                background:
                  "linear-gradient(135deg,#4facfe,#00f2fe)",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "12px 25px",
                borderRadius:
                  "10px",
                fontSize:
                  "16px",
                fontWeight:
                  "bold",
                cursor:
                  "pointer",
              }}
            >
              ✅ Buy All
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;