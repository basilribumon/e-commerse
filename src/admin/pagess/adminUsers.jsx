import AdminLayout from "../../layouts/AdminLayout";
function AdminUsers() {
  return (
    <AdminLayout>
      <div>
        <h1 style={{ color: "#131921" }}>
          👤 Users Management
        </h1>

        <p style={{ color: "#555" }}>
          Here admin can view and manage users.
        </p>
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;