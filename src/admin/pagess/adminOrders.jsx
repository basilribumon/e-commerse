import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import AdminLayout from "../../layouts/AdminLayout";

import {
  fetchAllOrders,
  updateOrderStatus,
} from "../redux/adminOrderSlice";

function AdminOrders() {
  const dispatch = useDispatch();
  const [search,setSearch] = useState("");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const {
    orders,
    loading,
    error,
  } = useSelector(
    (state) => state.adminOrders
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (
    order,
    status
  ) => {
    dispatch(
      updateOrderStatus({
        ...order,
        status,
      })
    );
  };
  const filteredOrders = orders.filter((order) => {
  const keyword = search.toLowerCase();

  return (
    order.id.toString().toLowerCase().includes(keyword) ||
    order.userName.toLowerCase().includes(keyword) ||
    order.userEmail.toLowerCase().includes(keyword) ||
    order.status.toLowerCase().includes(keyword)
  );
});

  return (
    <AdminLayout>
      <h1>📦 Order Management</h1>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search by Order ID, Customer, Email or Status..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "350px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
    }}
  />
</div>
      {loading && (
        <h2>Loading...</h2>
      )}

      {error && (
        <h2>{error}</h2>
      )}

      {!loading && (
        <>
          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Total</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map(
                (order) => (
                  <tr
                    key={order.id}
                  >
                    <td>
                      {order.id}
                    </td>

                    <td>
                      {order.userName}
                    </td>

                    <td>
                      {order.userEmail}
                    </td>

                    <td>
                      ₹{order.total}
                    </td>

                    <td>
                      {order.date}
                    </td>

                    <td>
                      {
                        order.paymentMethod
                      }
                    </td>

                    <td>
                      <select
                        value={
                          order.status
                        }
                        onChange={(
                          e
                        ) =>
                          handleStatusChange(
                            order,
                            e.target
                              .value
                          )
                        }
                      >
                        <option>
                          Pending
                        </option>

                        <option>
                          Processing
                        </option>

                        <option>
                          Shipped
                        </option>

                        <option>
                          Delivered
                        </option>
                      </select>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          setSelectedOrder(
                            order
                          )
                        }
                        style={{
                          background:
                            "#0d6efd",
                          color:
                            "#fff",
                          border:
                            "none",
                          padding:
                            "8px 14px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                        }}
                      >
                        👁 View
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* View Order Popup */}

          {selectedOrder && (
            <div
              style={{
                position:
                  "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                zIndex: 999,
              }}
            >
              <div
                style={{
                  width: "700px",
                  background:
                    "#fff",
                  borderRadius:
                    "15px",
                  padding: "25px",
                  maxHeight:
                    "85vh",
                  overflowY:
                    "auto",
                }}
              >
                <h2>
                  📦 Order
                  Details
                </h2>

                <hr />

                <h3>
                  Customer
                </h3>

                <p>
                  <strong>
                    Name:
                  </strong>{" "}
                  {
                    selectedOrder.userName
                  }
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {
                    selectedOrder.userEmail
                  }
                </p>

                <p>
                  <strong>
                    Phone:
                  </strong>{" "}
                  {
                    selectedOrder
                      .address
                      ?.phone
                  }
                </p>

                <hr />

                <h3>
                  Delivery
                  Address
                </h3>

                <p>
                  {
                    selectedOrder
                      .address
                      ?.address
                  }
                </p>

                <p>
                  {
                    selectedOrder
                      .address
                      ?.city
                  }
                </p>

                <p>
                  {
                    selectedOrder
                      .address
                      ?.pincode
                  }
                </p>

                <hr />

                <h3>
                  Purchased
                  Products
                </h3>

                {selectedOrder.items?.map(
                  (
                    item
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      style={{
                        display:
                          "flex",
                        gap: "15px",
                        alignItems:
                          "center",
                        marginBottom:
                          "15px",
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
                          objectFit:
                            "contain",
                        }}
                      />

                      <div>
                        <h4>
                          {
                            item.title
                          }
                        </h4>

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

                <hr />

                <h2
                  style={{
                    color:
                      "green",
                  }}
                >
                  Total :
                  ₹
                  {
                    selectedOrder.total
                  }
                </h2>

                <button
                  onClick={() =>
                    setSelectedOrder(
                      null
                    )
                  }
                  style={{
                    width: "100%",
                    padding:
                      "12px",
                    marginTop:
                      "20px",
                    background:
                      "#dc3545",
                    color:
                      "#fff",
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
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}

export default AdminOrders;