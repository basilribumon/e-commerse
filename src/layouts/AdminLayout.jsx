import AdminSidebar from "../admin/componentss/adminSidebar";
import AdminHeader from "../admin/componentss/adminHeader";

function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
          padding: "25px",
          boxSizing: "border-box",
        }}
      >
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;