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
    loginUser.fulfilled.match(
      result
    )
  ) {
    navigate("/");
  }
};


    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
         

         {error &&(
            <p>{error}</p>
         )}
        <button onClick={() => navigate("/register")}>
        Register
        </button>
            </form>
        </div>
    )
}
export default Login;