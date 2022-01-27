import "../App.css";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { useContext } from "react/cjs/react.development";

function Navbar() {

  const appContext = useContext(AppContext);
  const handleLogout = () => {
    console.log("handlelogout")
  };

  return (
    <div className="navbar">
        <div className="left-nav-wrapper">
          <NavLink activeClassName="active" className="homeLink" to="/">Home</NavLink>
          <NavLink activeClassName="active" className="profileLink" to="/Profile">Profile</NavLink>
          <div onClick={handleLogout}>Logout</div>
        </div>

        <div className="right-nav-wrapper">
          <NavLink activeClassName="active" className="loginLink" to="/login">Login</NavLink>
          <NavLink activeClassName="active"className="signupLink" to="/signup">Signup</NavLink>
        </div>
     
    </div>
  );
}


export default Navbar;