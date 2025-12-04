// import React from 'react'
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Slices/authSlice";


const Login = () => {
  const [login, { isLoading, isError, error: loginError }] = useLoginMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // handle data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData).unwrap();
      console.log("login success");
    } catch (error) {
      console.error("error in login in frontend", error)
    }
    console.log("Form Data:", formData);
    // Simulate login success
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usermail">Email</label>
          <input type="text" id="usermail" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="usepassword">Password</label>
          <input type="password" id="usepassword" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <p>if you don't have account then <Link to="/register">Register</Link> first</p>
      <p>if you loss your password then click <Link to="/forgetpassword">Forget password</Link></p>
    </div>
  )
}

export default Login

