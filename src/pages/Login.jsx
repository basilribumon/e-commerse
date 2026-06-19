import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } =
    useSelector(
      (state) => state.auth
    );

  const [
    credentials,
    setCredential,
  ] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredential({
      ...credentials,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const result =
        await dispatch(
          loginUser(
            credentials
          )
        );

      if (
        loginUser.fulfilled.match(
          result
        ) &&
        result.payload
      ) {
        navigate("/");

        window.location.reload();
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
          maxWidth: "420px",
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
              marginBottom:
                "10px",
            }}
          >
            📱 CaseHub
          </h1>

          <h2>
            Welcome Back
          </h2>

          <p
            style={{
              color:
                "#666",
            }}
          >
            Login to continue
            shopping
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
            type="email"
            name="email"
            placeholder="📧 Email Address"
            value={
              credentials.email
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
              credentials.password
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
              ? "Logging In..."
              : "Login"}
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
            Don't have an
            account?
          </p>

          <button
            onClick={() =>
              navigate(
                "/register"
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
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;