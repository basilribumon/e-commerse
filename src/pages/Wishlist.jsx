import { useSelector, useDispatch } from "react-redux";

import {
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";

import { addToCart } from "../redux/slices/CartSlice";

import Navbar from "../components/Navbar";

function Wishlist() {
  const dispatch = useDispatch();

  const { wishlistItems } =
    useSelector(
      (state) =>
        state.wishlist
    );
    

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor:
          "#f0f8ff",
        padding: "20px",
      }}
    >
      <Navbar />

      <h1
        style={{
          textAlign: "center",
          color: "#131921",
          marginBottom: "30px",
        }}
      >
        ❤️ My Wishlist
      </h1>

      {wishlistItems.length ===
      0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          <h2>
            Your Wishlist is
            Empty
          </h2>

          <p>
            Add products you
            love ❤️
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {wishlistItems.map(
            (item) => (
              <div
                key={item.id}
                style={{
                  background:
                    "linear-gradient(135deg,#ffffff,#d6ecff)",
                  borderRadius:
                    "18px",
                  padding:
                    "15px",
                  textAlign:
                    "center",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={
                    item.image
                  }
                  alt={
                    item.title
                  }
                  width="140"
                  height="140"
                  style={{
                    objectFit:
                      "contain",
                    marginBottom:
                      "10px",
                  }}
                />

                <h3
                  style={{
                    minHeight:
                      "50px",
                    color:
                      "#131921",
                  }}
                >
                  {
                    item.title
                  }
                </h3>

                <h2
                  style={{
                    color:
                      "#0077ff",
                  }}
                >
                  ₹
                  {
                    item.price
                  }
                </h2>

                <div
                  style={{
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    gap: "10px",
                    marginTop:
                      "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      dispatch(
                        removeFromWishlist(
                          item.id
                        )
                      )
                    }
                    style={{
                      background:
                        "#ff4d4f",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "10px",
                      borderRadius:
                        "10px",
                      cursor:
                        "pointer",
                    }}
                  >
                    ❌ Remove
                  </button>

                  <button
                    onClick={() => {
                      dispatch(
                        addToCart(
                          item
                        )
                      );

                      alert(
                        "✅ Product added to cart"
                      );
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg,#4facfe,#00f2fe)",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "10px",
                      borderRadius:
                        "10px",
                      fontWeight:
                        "bold",
                      cursor:
                        "pointer",
                    }}
                  >
                    🛒 Move To Cart
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Wishlist;