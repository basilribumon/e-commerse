import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProducts } from "../redux/slices/ProductSlice";
import { logout } from "../redux/slices/authSlice";

import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";



function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    products,
    loading,
    error,
  } = useSelector(
    (state) => state.products
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 14;

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [sortOrder, setSortOrder] =
    useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

const handleLogout = () => {
  dispatch(logout());

  navigate("/login", {
    replace: true,
  });
};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  let filteredProducts =
    products.filter((product) =>
      product.title.toLowerCase()
     .includes(searchTerm.toLowerCase().trim()
     )
    );

  if (
    selectedCategory !== "All"
  ) {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.category ===
          selectedCategory
      );
  }

  if (
    sortOrder ===
    "lowToHigh"
  ) {
    filteredProducts = [
      ...filteredProducts,
    ].sort(
      (a, b) =>
        a.price - b.price
    );
  }

  if (
    sortOrder ===
    "highToLow"
  ) {
    filteredProducts = [
      ...filteredProducts,
    ].sort(
      (a, b) =>
        b.price - a.price
    );
  }

  const lastProductIndex =
    currentPage *
    productsPerPage;

  const firstProductIndex =
    lastProductIndex -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstProductIndex,
      lastProductIndex
    );

  const totalPages =
    Math.ceil(
      filteredProducts.length /
        productsPerPage
    );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor:
          "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <Navbar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
  handleLogout={handleLogout}
  setCurrentPage={setCurrentPage}
/>

    {/* welcome */}

      <div
        style={{
          background:"linear-gradient(135deg,#ffffff,#d6ecff)",
          color: "black",
          padding: "25px",
          borderRadius: "15px",
          margin: "20px 0",
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          👋 Welcome Back,
          {user?.name}
        </h1>

        <p
          style={{
            marginTop: "10px",
            opacity: 0.9,
          }}
        >
          Discover the latest
          mobile cases and
          accessories.
        </p>
      </div>

      {/* Products */}

      <h2
        style={{
          marginBottom: "20px",
          color: "#131921",
        }}
      >
        🛍️ Featured Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {currentProducts.length >
        0 ? (
          currentProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={
                  product
                }
              />
            )
          )
        ) : (
          <h2>
            No Products Found
          </h2>
        )}
      </div>

      {/* Pagination */}

      {filteredProducts.length >
        0 && (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            gap: "15px",
          }}
        >
          <button
            disabled={
              currentPage ===
              1
            }
            onClick={() =>
              setCurrentPage(
                currentPage -
                  1
              )
            }
            style={{
              padding:"10px 15px",
              borderRadius:"8px",
              border:"none",
              cursor:"pointer",
            }}
          >
            ⬅ Previous
          </button>

          <span
            style={{
              fontWeight:
                "bold",
            }}
          >
            Page{" "}
            {currentPage} of{" "}
            {totalPages}
          </span>

          <button
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage +
                  1
              )
            }
            style={{
              padding:"10px 15px",
              borderRadius:"8px",
              border:"none",
              cursor:"pointer",
            }}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;