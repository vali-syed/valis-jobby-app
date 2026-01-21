import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'


import './index.css'

const onLogout = () =>{
    Cookies.remove("jwt_token");

}

const Header = () => (
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
                <li className="nav-item">Jobs</li>
            </ul>
            <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
    </nav>
)

export default Header;