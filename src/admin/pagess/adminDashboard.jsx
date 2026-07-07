import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchAdminDashboardData } from "../redux/adminDashboardSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const dispatch = useDispatch();

const {
  totalProducts,
  totalUsers,
  totalOrders,
  totalRevenue,
  orders,
  loading,
  error,
} = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboardData());
  }, [dispatch]);

const salesData = (orders || []).map((order) => ({
  date: order.date.split(",")[0],
  revenue: Number(order.total),
}));
console.log("Orders:", orders);
console.log("Sales Data:", salesData);

  const cardStyle = {
    background: "white",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    flex: 1,
    minWidth: "220px",
  };

  return (
    <AdminLayout>
      <div>
        <h1 style={{ color: "#131921", marginBottom: "20px" }}>
          📊 Admin Dashboard
        </h1>

        {loading && <p>Loading dashboard data...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={cardStyle}>
              <h3 style={{ marginBottom: "10px", color: "#555" }}>
                📦 Total Products
              </h3>
              <h1 style={{ color: "#4facfe", margin: 0 }}>
                {totalProducts}
              </h1>
            </div>

            <div style={cardStyle}>
              <h3 style={{ marginBottom: "10px", color: "#555" }}>
                👤 Total Users
              </h3>
              <h1 style={{ color: "#10b981", margin: 0 }}>
                {totalUsers}
              </h1>
            </div>

            <div style={cardStyle}>
              <h3 style={{ marginBottom: "10px", color: "#555" }}>
                🧾 Total Orders
              </h3>
              <h1 style={{ color: "#f59e0b", margin: 0 }}>
                {totalOrders}
              </h1>
            </div>
            <div style={cardStyle}>
  <h3 style={{ marginBottom: "10px", color: "#555" }}>
    💰 Total Revenue
  </h3>

  <h1 style={{ color: "#16a34a", margin: 0 }}>
    ₹{totalRevenue}
  </h1>
  
</div>


          </div>
        )}
      </div>
      <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h2>📈 Sales Overview</h2>

    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#4F46E5"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

    </AdminLayout>
  );
}

export default AdminDashboard;