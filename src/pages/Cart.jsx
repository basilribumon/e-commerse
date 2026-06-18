import { useSelector } from "react-redux";

function Cart() {
  const { cartItems } =
    useSelector(
      (state) => state.cart
    );

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total + item.price,
      0
    );

  const handleBuyAll = () => {
    alert(
      "Order Placed Successfully!"
    );
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>
          Cart is Empty
        </h2>
      ) : (
        <>
        
          {cartItems.map(
            (item) => (
              <div
                key={item.id}
                style={{
                  border:
                    "1px solid #ddd",
                  margin:
                    "10px 0",
                  padding:
                    "7px",
                }}
              >
                <img
                src={item.image}
                alt={item.title}
                width="80"
                height="80"
                style={{
                    objectFit: "cover",
                    borderRadius: "5px",
                }}
                 />
                
                <h3>
                  {item.title}
                </h3>

                <p>
                  ₹{item.price}
                </p>

                <p>{item.description}</p>
              </div>
            )
          )}

          <h2>
            Total: ₹
            {totalPrice}
          </h2>

          <button
            onClick={
              handleBuyAll
            }
          >
            Buy All
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;