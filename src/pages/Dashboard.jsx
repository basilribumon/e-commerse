import { useSelector } from "react-redux";

function Dashboard() {
  const products = useSelector((state) => state.products.products);
  const orders = useSelector((state) => state.orders.orders);
  const users = useSelector((state) => state.auth.users || []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div
        st
        yle={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h2>Total Products</h2>
          <p>{products.length}</p>
        </div>

        <div style={cardStyle}>
          <h2>Total Orders</h2>
          <p>{orders.length}</p>
        </div>

        <div style={cardStyle}>
          <h2>Total Users</h2>
          <p>{users.length}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  width: "200px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  textAlign: "center",
};

export default Dashboard;