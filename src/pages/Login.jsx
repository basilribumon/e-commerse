import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading,error } = useSelector((state)=>state.auth);

    const [credentials,setCredential]=useState({
        email:"",
        password:"",
    })

    const handleChange = (e)=>{
        setCredential({
            ...credentials,[e.target.name]:e.target.value,
        });
    };

const handleSubmit = async (
  e
) => {
  e.preventDefault();

  const result =
    await dispatch(
      loginUser(
        credentials
      )
    );

  console.log(result);

if (
  loginUser.fulfilled.match(result) &&
  result.payload
) {
  navigate("/");

  window.location.reload();
}
};


    return(
      <div style={{
      display:"flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}>
        
      
        <div 
        style={{
        
        alignItems:"center",  
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}>
            <h2>Login</h2>
            <form 
            style={{
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  }}
            onSubmit={handleSubmit}>
        <input 
        type="email"
        name="email"
        placeholder="E-mail"
        onChange={handleChange}
        required
         />
        <input 
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
         />

         <button type="submit">
            {loading ? "Logging in..":"Login"}
            
            
         </button>
         

         {error && (
  <p
    style={{
      color: "red",
      marginTop: "10px",
    }}
  >
    {error}
  </p>
)}

         <p>If you dont have an account?Register.</p>
        <button onClick={() => navigate("/register")}>
        To Register 
        </button>
            </form>
        </div>
        </div>
    )
}
export default Login;