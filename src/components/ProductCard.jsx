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
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius:"10px"
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        width="150"
      />

      <h3>{product.title}</h3>

      <p>${product.price}</p>

      <p>{product.category}</p>

      <button
        onClick={() =>
          dispatch(addToCart(product))
        }
      >
        Buy
      </button><br />
      <button
  onClick={() =>
    navigate(
      `/product/${product.id}`
    )
  }
>
  View Details
</button><br />
      <button
        onClick={() =>
          dispatch(addToWishlist(product))
        }
      >
        Add to Wishlist
      </button>
    </div>
  );
}

export default ProductCard;