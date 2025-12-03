// import React from 'react'
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";


const ForgetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        previousPssword:"",
        newPassword:"",
        confirmPassword:""
    })

    // handle data
    const handleChange = (e)=>{
          setFormData({
            ...formData,
            [e.target.name]:e.target.value
          })
    }

    // handle Submit
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Form Data:", formData);
        navigate("/login")
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="previous-password">Previous Password</label>
            <input type="text" id="previous-password" placeholder="Enter your name" name="previousPssword"value={formData.previousPassword} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="new-password">New Password</label>
            <input type="text" id="new-password" placeholder="Enter your email"  name="newPassword" value={formData.newPassword} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="text" id="confirmPassword" placeholder="Enter your password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
        </div>
        <div>
            <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ForgetPassword

