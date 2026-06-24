import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../redux/adminSlice";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      credentials.email === "admin@gmail.com" &&
      credentials.password === "123456"
    ) {
      dispatch(
        loginAdmin({
          email: credentials.email,
          name: "Admin",
        })
      );

      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#e0f2ff,#f8fbff)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "20px",
          padding: "35px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              color: "#131921",
              marginBottom: "10px",
            }}
          >
            🛠 Admin Panel
          </h1>

          <h2>Admin Login</h2>

          <p style={{ color: "#666" }}>
            Login to manage products, users and orders
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="📧 Admin Email"
            value={credentials.email}
            onChange={handleChange}
            required
            style={{
              padding: "14px",
              border: "1px solid #d6ecff",
              borderRadius: "10px",
              fontSize: "15px",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{
              padding: "14px",
              border: "1px solid #d6ecff",
              borderRadius: "10px",
              fontSize: "15px",
            }}
          />

          <button
            type="submit"
            style={{
              background:
                "linear-gradient(135deg,#4facfe,#00f2fe)",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;