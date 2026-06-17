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
      }}>
      <p>{product.category}</p>
      <img
        src={product.image}
        alt={product.title}
        width="150"
      />

      <h3>{product.title}</h3>

      <p>₹{product.price}</p>

       

      <button style={{width:"50%",height:"30px",backgroundColor:"white",color:"black",fontSize:"17px"}} 
      onClick={() =>dispatch(addToCart(product))}>Buy</button><br />
   
   
   
     <button
  onClick={() =>
    navigate(`/productdetails/${product.id}`)
  }
>
  View Details
</button><br />



      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;