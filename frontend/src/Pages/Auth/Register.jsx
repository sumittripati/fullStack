// import React from 'react'
import { useState } from "react"
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useRegisterMutation } from '../../Redux/Slices/authSlice'
import './Register.css'

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, isError, error: loginError, isSuccess }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("");

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
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    try {
      await register(formData).unwrap();
    } catch (error) {
      console.error("error in register in frontend", error)
    }
    console.log("Form Data:", formData);
    navigate("/login")
  }

  return (
    <div>

      {loginError && (
        <p style={{ color: "red" }}>
          {error?.data?.message || "Failed to add task"}
        </p>
      )}


      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div>
          <label htmlFor="username">Name</label>
          <input type="text" id="username" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="usermail">Email</label>
          <input type="text" id="usermail" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="usepassword">Password</label>
          <input type="text" id="usepassword" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <button disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
          {error && <p className="error-msg">{error}</p>}
        </div>
      </form>
      <p>if you allready registered then you can <NavLink to='/login'>login</NavLink>here</p>
    </div>
  )
}

export default Register
