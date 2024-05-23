import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { FaTimes, FaBars } from 'react-icons/fa';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const navRef = useRef();

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
      console.log("Navbar toggled"); // Debugging log
    } else {
      console.log("navRef is null"); // Debugging log
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <header>
      <div className="navbar">
        <Link to='/'><img className='logo' src={assets.todo_image} alt="Logo" /></Link>
        <nav ref={navRef} className="navbar-menu">
          <li><Link onClick={showNavbar} to="/">Home</Link></li>
          <li><Link onClick={showNavbar} to="/add">Add</Link></li>
          <li><Link onClick={showNavbar} to="/next">This-Week</Link></li>
          <li><Link onClick={showNavbar} to="/list">List</Link></li>
          <li><Link onClick={showNavbar} to="/pending">Pending-Task</Link></li>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
        <div className="navbar-right-section">
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile Icon" />
              <ul className='dropdown'>
                <li onClick={logout}><img src={assets.logout} alt="Logout Icon" /><p>Logout</p></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
