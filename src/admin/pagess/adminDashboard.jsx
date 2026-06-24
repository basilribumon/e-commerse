import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchAdminDashboardData } from "../redux/adminDashboardSlice";

function AdminDashboard() {
  const dispatch = useDispatch();

  const {
    totalProducts,
    totalUsers,
    totalOrders,
    loading,
    error,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboardData());
  }, [dispatch]);

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
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;