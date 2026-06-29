import { useEffect } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { fetchOrders } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Orders() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { orders } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector(
  (state) => state.auth
);
useEffect(() => {
  if (user) {
    dispatch(fetchOrders(user.id));
  }
}, [dispatch, user]);
  return (
    <div
      style={{
        background:
          "#f4f6f8",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <Navbar/>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#131921",
        }}
      >
        📦 My Orders
      </h1>

      {orders.map((order) => (
  <div
    key={order.id}
    style={{
      background: "white",
      borderRadius: "15px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h3>
      📦 Order Placed
    </h3>

    <p>
      📅 {order.date}
    </p>

    <p>
      🚚 {order.status}
    </p>

    <p>
      💳 {order.paymentMethod}
    </p>

    <hr />

    <h4>
      📍 Delivery Address
    </h4>

    <p>
      {order.address?.address}
    </p>

    <p>
      {order.address?.city}
    </p>

    <p>
      📞 {order.address?.phone}
    </p>

    <hr />

    <h4>
      🛍 Purchased Items
    </h4>

    {order.items.map((item) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginTop: "15px",
          paddingBottom: "10px",
          borderBottom:
            "1px solid #eee",
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          width="80"
          height="80"
          style={{
            borderRadius: "10px",
            objectFit: "contain",
          }}
        />

        <div>
          <h4
            style={{
              margin: "0 0 5px 0",
            }}
          >
            {item.title}
          </h4>

          <p style={{
              color: "#007bff",
              fontWeight: "bold",
              margin: 0,
            }} >
            ₹{item.price}
          </p>
        </div>
      </div>
    ))}

    <div
      style={{
        textAlign: "right",
        marginTop: "15px",
      }}
    >
      <h2
        style={{
          color: "green",
        }}
      >
        Total: ₹{order.total}
      </h2>
    </div>



<button
  onClick={() => navigate("/home")}
  style={{
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
    transition: "all 0.3s ease",
    marginLeft:"50%"
  }}
  onMouseOver={(e) => {
    e.target.style.transform = "translateY(-2px)";
  }}
  onMouseOut={(e) => {
    e.target.style.transform = "translateY(0)";
  }}
>
  🏠 Back to Home Page
</button>  



</div>
))}

    </div>
  );
}

export default Orders;