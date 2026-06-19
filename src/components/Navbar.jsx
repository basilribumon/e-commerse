import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  handleLogout,
  setCurrentPage,
}) {
  const navigate = useNavigate();

  const [showSettings, setShowSettings] =
    useState(false);

  const buttonStyle = {
    backgroundColor: "#232f3e",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        width: "100%",
        backgroundColor: "#131921",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        zIndex: "1000",
        boxSizing: "border-box",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* Logo */}

      <h2
        style={{
          color: "white",
          margin: 0,
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        📱 CaseHub
      </h2>

      {/* Search + Filter */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(
              e.target.value
            );
            setCurrentPage(1);
          }}
          style={{
            width: "280px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(
              e.target.value
            );
            setCurrentPage(1);
          }}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          <option value="All">
            All Categories
          </option>
          <option value="IOS">
            IOS
          </option>
          <option value="Redme">
            Redme
          </option>
          <option value="Vivo">
            Vivo
          </option>
          <option value="Samsung">
            Samsung
          </option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(
              e.target.value
            );
            setCurrentPage(1);
          }}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          <option value="">
            Sort By Price
          </option>

          <option value="lowToHigh">
            Price: Low → High
          </option>

          <option value="highToLow">
            Price: High → Low
          </option>
        </select>
      </div>

      {/* Navigation */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          style={buttonStyle}
          onClick={() =>
            navigate("/")
          }
        >
          🏠 Home
        </button>

        <button
          style={buttonStyle}
          onClick={() =>
            navigate("/cart")
          }
        >
          🛒 Cart
        </button>
        <button
          style={buttonStyle}
          onClick={() =>
            navigate("/orders")
          }
        >
          🚚 Orders
        </button>

        <button
          style={buttonStyle}
          onClick={() =>
            navigate(
              "/wishlist"
            )
          }
        >
          ❤️ Wishlist
        </button>

        {/* Settings */}

        <div
          style={{
            position:
              "relative",
          }}
        >
          <button
            style={
              buttonStyle
            }
            onClick={() =>
              setShowSettings(
                !showSettings
              )
            }
          >
            ⚙️ Settings
          </button>

          {showSettings && (
            <div
              style={{
                position:
                  "absolute",
                top: "50px",
                right: "0",
                background:
                  "white",
                padding:
                  "15px",
                borderRadius:
                  "10px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.2)",
                minWidth:
                  "150px",
              }}
            >
              <ThemeToggle />

            <button
  onClick={handleLogout}
  style={{
    width: "100%",
    marginTop: "10px",
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    background: "#ff4d4f",
    color: "white",
    cursor: "pointer",
  }}
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