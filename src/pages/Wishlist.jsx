import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

import {
  addToCart,
} from "../redux/slices/CartSlice";

function Wishlist() {
  const dispatch =
    useDispatch();

  const { items } =
    useSelector(
      (state) =>
        state.wishlist
    );

  if (items.length === 0) {
    return (
      <h2>
        Wishlist is Empty
      </h2>
    );
  }

  return (
    <div>
      <h1>Wishlist</h1>

      {items.map((item) => (
        <div
          key={item.id}
        >
          <h3>
            {item.title}
          </h3>

          <p>
            ${item.price}
          </p>

          <button
            onClick={() =>
              dispatch(
                addToCart(
                  item
                )
              )
            }
          >
            Move to Cart
          </button>

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
        </div>
      ))}
    </div>
  );
}

export default Wishlist;