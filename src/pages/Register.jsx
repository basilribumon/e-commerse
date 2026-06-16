import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlice";


function register(){
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading,error } = useSelector((state)=>state.auth);

    const[formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
    });



    const handleChange = (e)=>setFormData({
        ...formData,[e.target.name]:e.target.value,
    });

const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(formData));

    if(registerUser.fulfilled.match(result)){
        alert("Registration Succcessful");
        navigate("/login")
    }

}


return(
    <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
    <input 
    type="text"
    name="name"
    placeholder="Name"
    onChange={handleChange}
    required
    />
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
  {loading ? "Registering..." : "Register"}
</button>

        {error &&(
            <p>
                {error}
            </p>
        )}
        <button onClick={() => navigate("/Login")}>
         Login
        </button>

        </form>
    </div>
)
}
export default register;