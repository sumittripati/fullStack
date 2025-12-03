// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import About from './Pages/Home/About'
import Contact from './Pages/Home/Contact'
import Services from './Pages/Home/Services'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import ForgetPassword from './Pages/Auth/ForgetPassword'
import NotFound from './Pages/NotFound'
import Header from './Components/layout/Header/Header'
import Footer from './Components/layout/Footer/Footer'


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
