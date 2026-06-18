import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/ProductSlice";
import Navbarr from "../components/Navbartwo";
import { addToCart } from "../redux/slices/CartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";

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

  // Wait until products are loaded
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
    <Navbarr/>
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
        display: "flex",
        gap: "50px",
      }}
    >
      
      <div>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "350px",
            height: "350px",
            objectFit: "contain",
          }}
        />
      </div>

      <div>
        <h1>{product.title}</h1>

        <h2>₹{product.price}</h2>

        <p>
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock > 0
            ? `${product.stock} Available`
            : "Out of Stock"}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>
          {product.description ||
            "No description available"}
        </p>

        <button
  style={{
    padding: "10px 20px",
    marginRight: "10px",
  }}
  onClick={() => {
    dispatch(addToCart(product));

    alert(
      "✅ Product added to cart"
    );
  }}
>
  Add to Cart
</button>

        <button
  style={{
    padding: "10px 20px",
    marginRight: "10px",
  }}
  onClick={() => {
    dispatch(
      addToWishlist(product)
    );

    alert(
      "❤️ Product added to wishlist"
    );
  }}
>
  Add to Wishlist
</button>

        <button
          style={{
            padding: "10px 20px",
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
    </>
  );
}

export default ProductDetails;