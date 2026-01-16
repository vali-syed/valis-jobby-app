import {Link} from 'react-router-dom'

import './index.css'

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
            <button className="logout-button">Logout</button>
        </div>
    </nav>
)

export default Header;