import { useSelector,
useDispatch } from "react-redux";

import {
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

import Navbar from
"../components/Navbar";
import { addToCart } from "../redux/slices/CartSlice";

function Wishlist() {
  const dispatch =
    useDispatch();

  const {
    wishlistItems,
  } = useSelector(
    (state) =>
      state.wishlist
  );

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <Navbar />

      <h1>
        My Wishlist
      </h1>

      {wishlistItems.length ===
      0 ? (
        <h3>
          Wishlist is Empty
        </h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {wishlistItems.map(
            (item) => (
              <div
                key={item.id}
                style={{
                  border:
                    "1px solid #ddd",
                  padding:
                    "15px",
                }}
              >
                <img
                  src={
                    item.image
                  }
                  alt={
                    item.title
                  }
                  width="150"
                />

                <h3>
                  {
                    item.title
                  }
                </h3>

                <p>
                  ₹
                  {
                    item.price
                  }
                </p>

                <button
                  onClick={() =>
                    dispatch(
                      removeFromWishlist(
                        item.id
                      )
                    )
                  }
                >
                  Remove
                </button>
                <button
  onClick={() => {
    dispatch(
      addToCart(item)
    );

    alert(
      "✅ Product added to cart"
    );
  }}
>
  Move to Cart
</button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Wishlist;