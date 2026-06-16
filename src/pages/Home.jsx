import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProducts } from "../redux/slices/ProductSlice";
import { logout } from "../redux/slices/authSlice";

import ProductCard from "../components/ProductCard";

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

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 5;

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

  // Search
  let filteredProducts =
    products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  // Filter
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

  // Sort
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

  // Empty State
  if (
    filteredProducts.length === 0
  ) {
    return (
      <h2>
        No Products Found
      </h2>
    );
  }

  // Pagination
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
        textAlign:"center"
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Products
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
          justifyContent:
            "center",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(
              e.target.value
            );

            setCurrentPage(1);
          }}
        />

        <select
          value={
            selectedCategory
          }
          onChange={(e) => {
            setSelectedCategory(
              e.target.value
            );

            setCurrentPage(1);
          }}
        >
          <option value="All">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Fashion">
            Fashion
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
        >
          <option value="">
            Sort By Price
          </option>

          <option value="lowToHigh">
            Price:
            Low → High
          </option>

          <option value="highToLow">
            Price:
            High → Low
          </option>
        </select>

        <button
          onClick={
            handleLogout
          }
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {currentProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={
                product
              }
            />
          )
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <button
          disabled={
            currentPage === 1
          }
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
        >
          Previous
        </button>

        <span>
          {" "}
          Page{" "}
          {currentPage} of{" "}
          {totalPages}{" "}
        </span>

        <button
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;