import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  removeFromCart,
  clearCart,
} from "../redux/slices/CartSlice";

function Cart() {
  const dispatch =
    useDispatch();

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
  alert("Order Placed Successfully!");
  navigate("/checkout");
};

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>
          Cart is Empty
        </h2>
      ) : (
        <>
          {cartItems.map(
            (item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "20px",
                  border:
                    "1px solid #ddd",
                  margin:
                    "10px 0",
                  padding:
                    "15px",
                  borderRadius:
                    "10px",
                }}
              >
                <img
                  src={
                    item.image
                  }
                  alt={
                    item.title
                  }
                  width="100"
                  height="100"
                  style={{
                    objectFit:
                      "cover",
                    borderRadius:
                      "10px",
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
                      item.description
                    }
                  </p>

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
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          )}

          <h2>
            Total: ₹
            {totalPrice}
          </h2>

          <button
            onClick={
              handleBuyAll

            }
          >
            Buy All
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;