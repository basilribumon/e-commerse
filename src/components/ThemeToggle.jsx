import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{
      display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
    }}>
    <button onClick={toggleTheme}>
      {theme === "light"
        ? "🌙 Dark"
        : "☀️ Light"}
    </button>
    </div>
  );
  
}

export default ThemeToggle;