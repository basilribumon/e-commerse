import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/ProductSlice";
import Navbarr from "../components/Navbartwo";
import { addToCart } from "../redux/slices/CartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const { products, loading, error } = useSelector(
  (state) => state.products
);

console.log("Redux Products:", products);
console.log("URL ID:", id);
  

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

 
  if (loading || products.length === 0) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  console.log(products);

const product = products.find(
  (item) => String(item.id) === String(id)
);

console.log("Found Product:", product);

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
  <>
    

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f0f8ff,#e6f4ff)",
        padding: "40px 20px",
      }}
    >
      <Navbar /><br /><br />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background:
            "linear-gradient(135deg,#ffffff,#d6ecff)",
          borderRadius: "25px",
          padding: "30px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
      

        <div
          style={{
            flex: "1",
            minWidth: "300px",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "350px",
              objectFit: "contain",
              background: "white",
              borderRadius: "20px",
              padding: "20px",
            }}
          />
        </div>

        {/* Product Info */}

        <div
          style={{
            flex: "1",
            minWidth: "300px",
          }}
        >
          <span
            style={{
              background: "white",
              padding: "8px 15px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {product.category}
          </span>

          <h1
            style={{
              marginTop: "20px",
              color: "#131921",
            }}
          >
            {product.title}
          </h1>

          <h2
            style={{
              color: "#0077ff",
              fontSize: "32px",
            }}
          >
            ₹{product.price}
          </h2>

          <p>
            <strong>
              Stock:
            </strong>{" "}
            {product.stock > 0
              ? `✅ ${product.stock} Available`
              : "❌ Out of Stock"}
          </p>

          <div
            style={{
              marginTop: "20px",
              background: "white",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <h3>
              📄 Description
            </h3>

            <p>
              {product.description ||
                "No description available"}
            </p>
          </div>

        

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "25px",
            }}
          >
            <button
              style={{
                background:
                  "linear-gradient(135deg,#4facfe,#00f2fe)",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
            dispatch(
              addToCart(product)
            );

            alert(
              "✅ Product added to Buy"
            );

            navigate(
              "/checkout"
            );
          }}
            >
              🛒 Buy Now
            </button>


            <button
              style={{
                background:
                  "linear-gradient(135deg,#4facfe,#00f2fe)",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(
                  addToCart(product)
                );

                alert(
                  "✅ Product added to cart"
                );
              }}
            >
              🛒 Add To Cart
            </button>

            <button
              style={{
                background:
                  "#ff4d6d",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(
                  addToWishlist(
                    product
                  )
                );

                alert(
                  "❤️ Product added to wishlist"
                );
              }}
            >
              ❤️ Add To Wishlist
            </button>

            <button
              style={{
                background:
                  "#131921",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(-1)
              }
            >
              ⬅ Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default ProductDetails;