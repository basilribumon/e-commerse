import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Orders() {
  const { orders } = useSelector(
    (state) => state.orders
  );

  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>
              ✅ Order Placed Successfully
            </h3>

            <p>
              <strong>
                Order ID:
              </strong>{" "}
              {order.id}
            </p>

            <p>
              <strong>
                Date:
              </strong>{" "}
              {order.date}
            </p>

            <p>
              <strong>
                Customer:
              </strong>{" "}
              {order.customerName}
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {order.address.address},{" "}
              {order.address.city},{" "}
              {order.address.pincode}
            </p>

            <p>
              <strong>
                Payment Method:
              </strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>
                Total Amount:
              </strong>{" "}
              ₹{order.total}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {order.status}
            </p>

            <h4>
              Ordered Products
            </h4>

            {order.items.map(
              (item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom:
                      "10px",
                    alignItems:
                      "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    width="70"
                    height="70"
                  />

                  <div>
                    <h4>
                      {item.title}
                    </h4>

                    <p>
                      ₹{item.price}
                    </p>
                  </div>
                 
                </div>
                
              )
              
            )}
            <div
  style={{
    marginTop: "20px",
    textAlign: "center",
  }}
>
  <h3>
    🎉 Thank you for shopping with
    CaseHub!
  </h3>

  <button
    onClick={() => navigate("/")}
    style={{
      padding: "10px 20px",
      cursor: "pointer",
      marginTop: "10px",
    }}
  >
    Continue Shopping
  </button>
</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;