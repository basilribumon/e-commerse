import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../redux/adminSlice";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "📦",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "👤",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "🧾",
    },
  ];

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin-login");
  };

  return (
    <div
      style={{
        width: "250px",
        background: "#131921",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🛠 Admin Panel
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
              background:
                location.pathname === item.path
                  ? "#4facfe"
                  : "#1f2937",
              color: "white",
              padding: "12px 15px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            {item.icon} {item.name}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            background: "#ff4d4f",
            color: "white",
            border: "none",
            padding: "12px 15px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;