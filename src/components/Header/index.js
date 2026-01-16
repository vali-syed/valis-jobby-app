import './index.css'

const Header = () => (
    <nav className="navbar">
        <div className="nav-container">
            <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="logo" className='website-logo'/>
            <ul className='nav-items'>
                <li className="nav-item">Home</li>
                <li className="nav-item">Jobs</li>
            </ul>
            <button className="logout-button">Logout</button>
        </div>
    </nav>
)

export default Header;