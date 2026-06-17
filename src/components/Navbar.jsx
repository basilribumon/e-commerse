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
      <h2 style={{ color: "white", margin: 0 }}>
        CaseHub.
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
       
      <input
  type="text"
  placeholder="Search Products..."
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }}
  style={{
    width: "400px",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
  }}
/>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Categories</option>
          <option value="IOS">IOS</option>
          <option value="Redme">Redme</option>
          <option value="Vivo">Vivo</option>
          <option value="Samsung">Samsung</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Sort By Price</option>
          <option value="lowToHigh">
            Price: Low → High
          </option>
          <option value="highToLow">
            Price: High → Low
          </option>
        </select>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;