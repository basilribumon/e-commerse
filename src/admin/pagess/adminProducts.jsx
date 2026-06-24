import AdminLayout from "../../layouts/AdminLayout";
function AdminProducts() {
  return (
    <AdminLayout>
      <div>
        <h1 style={{ color: "#131921" }}>
          📦 Products Management
        </h1>

        <p style={{ color: "#555" }}>
          Here admin can add, edit and delete products.
        </p>
      </div>
    </AdminLayout>
  );
}

export default AdminProducts;