import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar({
  handleLogout,
}) {
  const navigate = useNavigate();

  const [showSettings, setShowSettings] =
    useState(false);

  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#131921",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        zIndex: "1000",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        CaseHub.
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button
          onClick={() =>
            navigate("/")
          }
        >
          Home
        </button>

        <button
          onClick={() =>
            navigate("/cart")
          }
        >
          View Cart
        </button>

        <button
          onClick={() =>
            navigate("/wishlist")
          }
        >
          View Wishlist
        </button>

        <div
          style={{
            position: "relative",
          }}
        >
          <button
            onClick={() =>
              setShowSettings(
                !showSettings
              )
            }
          >
            Settings ⚙️
          </button>

          {showSettings && (
            <div
              style={{
                position:
                  "absolute",
                top: "40px",
                right: "0",
                background:
                  "white",
                padding: "10px",
                borderRadius:
                  "5px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.2)",
                display:
                  "flex",
                flexDirection:
                  "column",
                gap: "10px",
                minWidth:
                  "120px",
              }}
            >
              <ThemeToggle />

              <button
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;