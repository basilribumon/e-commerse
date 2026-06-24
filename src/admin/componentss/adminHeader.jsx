import { useSelector } from "react-redux";

function AdminHeader() {
  const { admin } = useSelector((state) => state.admin);

  return (
    <div
      style={{
        background: "white",
        padding: "20px 30px",
        borderRadius: "15px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#131921",
        }}
      >
        Admin Dashboard
      </h2>

      <div
        style={{
          fontWeight: "bold",
          color: "#333",
        }}
      >
        👋 Welcome, {admin?.name || "Admin"}
      </div>
    </div>
  );
}

export default AdminHeader;