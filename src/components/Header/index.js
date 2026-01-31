import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

import { AiFillHome } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

import './index.css'

const Header = () => {

    const navigate = useNavigate();

    const onLogout = () =>{
        Cookies.remove("jwt_token");
        navigate('/login',{replace:null});
    };
    
    return (
    <nav className="navbar">
        <div className="nav-container">
            <Link to="/">
            <img 
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png" 
                alt="logo" 
                className='website-logo'
            />
            </Link>
            <ul className='nav-items'>
                <li className="nav-item"><Link to="/">Home</Link></li>
                <li><Link to='/' ><AiFillHome className='home-icon-sm'/></Link></li>
                <li className="nav-item"><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/jobs"> <FaBriefcase className='job-icon-sm'/> </Link></li>
                <li><button className='logout-button-sm'><FiLogOut className='logout-icon-sm'/></button></li>
            </ul>
            <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
    </nav>
)}

export default Header;