import { NavLink, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  // const { isAuthenticated, logout } = useAuth();

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <div className="navbar">
      <div className="nav-left">
        <h2 className="logo">LOGO</h2>
      </div>

      <div className="nav-right">
        <ul className="nav-menu">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <div className="nav-auth">
        <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
          {/* {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
