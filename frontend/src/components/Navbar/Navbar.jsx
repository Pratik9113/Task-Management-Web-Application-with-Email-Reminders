import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token")
    setToken("");
    navigate("/")
  }
  return (
    <div className="navbar">
      <Link to='/'><img className='logo' src={assets.job_craft} alt="" /></Link>
      <ul className='navbar-menu'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">List</Link></li>
        <li><Link to="/pending">Pending-Task</Link></li>
      </ul>

      <div className="navbar-right-section">
        {!token ? <button onClick={() => setShowLogin(true)}>SignIn</button> :
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className='dropdown'>
              {/* <li><img src={assets.job_craft} alt='' /><p>order</p></li> */}
              <hr />
              <li onClick={logout}><img src={assets.logout} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
      </div>
    </div>
  );
}

export default Navbar;
