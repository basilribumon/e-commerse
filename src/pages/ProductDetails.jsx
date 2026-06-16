import { useParams, useNavigate } from "react-router-dom";
import { useSelector,useDispatch }from "react-redux";
import { useState} from "react";
import { addToCart } from "../redux/slices/CartSlice";

function ProductDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const product =
    useSelector(
      (state) =>
        state.products.products.find(
          (item) =>
            item.id ===
            Number(id)
        )
    );

  const [quantity,
    setQuantity] =
    useState(1);

  if (!product) {
    return (
      <h2>
        Product Not Found
      </h2>
    );
  }

  const handleAddToCart =
    () => {
      dispatch(
        addToCart({
          ...product,
          quantity,
        })
      );

      navigate("/cart");
    };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <button
        onClick={() =>
          navigate(-1)
        }
      >
        Back
      </button>

      <h1>
        {product.title}
      </h1>

      <img
        src={product.image}
        alt={product.title}
        width="250"
      />

      <h2>
        ${product.price}
      </h2>

      <p>
        Category:
        {" "}
        {
          product.category
        }
      </p>

      <p>
        Stock:
        {" "}
        {
          product.stock
        }
      </p>

      {product.stock >
      0 ? (
        <>
          <label>
            Quantity:
          </label>

          <input
            type="number"
            min="1"
            max={
              product.stock
            }
            value={
              quantity
            }
            onChange={(
              e
            ) =>
              setQuantity(
                Number(
                  e.target
                    .value
                )
              )
            }
          />

          <br />
          <br />

          <button
            onClick={
              handleAddToCart
            }
          >
            Add To Cart
          </button>
        </>
      ) : (
        <h3
          style={{
            color: "red",
          }}
        >
          Out of Stock
        </h3>
      )}
    </div>
  );
}

export default ProductDetails;