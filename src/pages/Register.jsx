import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } =
    useSelector(
      (state) => state.auth
    );

  const [formData, setFormData] =
  useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    alert(
      "❌ Passwords do not match"
    );
    return;
  }

  const result =
    await dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password:
          formData.password,
      })
    );

  if (
    registerUser.fulfilled.match(
      result
    )
  ) {
    alert(
      "✅ Registration Successful"
    );

    navigate("/login");
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#f0f8ff,#d6ecff)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background:
            "white",
          borderRadius:
            "20px",
          padding: "35px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            textAlign:
              "center",
            marginBottom:
              "25px",
          }}
        >
          <h1
            style={{
              color:
                "#131921",
            }}
          >
            📱 CaseHub
          </h1>

          <h2>
            Create Account
          </h2>

          <p
            style={{
              color:
                "#666",
            }}
          >
            Join CaseHub and
            start shopping
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          style={{
            display:
              "flex",
            flexDirection:
              "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            required
            style={{
              padding:
                "14px",
              border:
                "1px solid #d6ecff",
              borderRadius:
                "10px",
              fontSize:
                "15px",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email Address"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
            style={{
              padding:
                "14px",
              border:
                "1px solid #d6ecff",
              borderRadius:
                "10px",
              fontSize:
                "15px",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
            style={{
              padding:
                "14px",
              border:
                "1px solid #d6ecff",
              borderRadius:
                "10px",
              fontSize:
                "15px",
            }}
          />

          <input
  type="password"
  name="confirmPassword"
  placeholder="🔐 Confirm Password"
  value={
    formData.confirmPassword
  }
  onChange={handleChange}
  required
  style={{
    padding: "14px",
    border: "1px solid #d6ecff",
    borderRadius: "10px",
    fontSize: "15px",
  }}
/>
{formData.confirmPassword &&
  formData.password !==
    formData.confirmPassword && (
    <p
      style={{
        color: "red",
        margin: 0,
      }}
    >
      Passwords do not match
    </p>
)}

          <button
            type="submit"
            style={{
              background:
                "linear-gradient(135deg,#4facfe,#00f2fe)",
              color:
                "white",
              border:
                "none",
              padding:
                "14px",
              borderRadius:
                "10px",
              fontSize:
                "16px",
              fontWeight:
                "bold",
              cursor:
                "pointer",
            }}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

          {error && (
            <p
              style={{
                color:
                  "red",
                textAlign:
                  "center",
              }}
            >
              {error}
            </p>
          )}
        </form>

        <div
          style={{
            textAlign:
              "center",
            marginTop:
              "20px",
          }}
        >
          <p>
            Already have an
            account?
          </p>

          <button
            onClick={() =>
              navigate(
                "/login"
              )
            }
            style={{
              background:
                "#131921",
              color:
                "white",
              border:
                "none",
              padding:
                "12px 20px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
            }}
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;