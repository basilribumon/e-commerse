import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#ffffff,#d6ecff)",
        borderRadius: "20px",
        padding: "15px",
        boxShadow:
          "0 5px 15px rgba(0,0,0,0.1)",
        textAlign: "center",
        position: "relative",
        transition: "0.3s",
        cursor: "pointer",
      }}
    >
      {/* Wishlist Button */}

      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.15)",
        }}
        onClick={() => {
          dispatch(
            addToWishlist(product)
          );

          alert(
            "❤️ Added to Wishlist"
          );
        }}
      >
        ❤️
      </button>

      {/* Category */}

      <span
        style={{
          background: "#ffffff",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#555",
        }}
      >
        {product.category}
      </span>

      {/* Product Image */}

      <div
        style={{
          marginTop: "15px",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          width="140"
          height="140"
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      {/* Product Title */}

      <h3
        style={{
          color: "#131921",
          minHeight: "50px",
          marginTop: "10px",
        }}
      >
        {product.title}
      </h3>

      {/* Price */}

      <h2
        style={{
          color: "#0077ff",
          margin: "10px 0",
        }}
      >
        ₹{product.price}
      </h2>

      {/* Buttons */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Buy */}

        <button
          style={{
            background:
              "linear-gradient(135deg,#4facfe,#00f2fe)",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "15px",
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

            navigate(
              "/checkout"
            );
          }}
        >
          Buy Now
        </button>

        {/* View Details */}

        <button
          style={{
            background:
              "#131921",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(
              `/productdetails/${product.id}`
            )
          }
        >
          View Details
        </button>

        {/* Add To Cart */}

        <button
          style={{
            background:
              "#ffffff",
            border:
              "2px solid #4facfe",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            color:"black"
          }}
          onClick={() => {
            dispatch(
              addToCart(product)
            );

            alert(
              "🛒 Added to Cart"
            );
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;