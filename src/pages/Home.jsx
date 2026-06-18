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

  const { products, loading, error } =
    useSelector(
      (state) => state.products
    );

 const { user } = useSelector(
  (state) => state.auth
);

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 12;

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
      product.title
        .toLowerCase()
        .includes(
          searchTerm
            .toLowerCase()
            .trim()
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
        textAlign: "center",
      }}
    >
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={
          selectedCategory
        }
        setSelectedCategory={
          setSelectedCategory
        }
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleLogout={
          handleLogout
        }
        setCurrentPage={
          setCurrentPage
        }
      />

      <div
  style={{
    textAlign: "left",
    marginTop: "15px",
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "bold",
  }}
>
 👋 Welcome to CaseHub, {user?.name}
</div>

     

      <h2>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr))",
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

      {filteredProducts.length >
        0 && (
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
            Page {currentPage} of{" "}
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
      )}
    </div>
  );
}

export default Home;