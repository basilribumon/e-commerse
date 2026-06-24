import AdminLayout from "../../layouts/AdminLayout";

function AdminOrders() {
  return (
    <AdminLayout>
      <div>
        <h1 style={{ color: "#131921" }}>
          🧾 Orders Management
        </h1>

        <p style={{ color: "#555" }}>
          Here admin can view all orders.
        </p>
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;