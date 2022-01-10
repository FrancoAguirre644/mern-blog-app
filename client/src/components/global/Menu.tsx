import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {

    const bfLoginLinks = [
        { label: 'login', path: '/login' },
        { label: 'register', path: '/register' },
    ]

    return (
        <ul className="navbar-nav ms-auto">
            {
                bfLoginLinks.map((link, index) => (
                    <li className="nav-item" key={index}>
                        <Link className="nav-link text-capitalize" to={link.path}>{link.label}</Link>
                    </li>
                ))
            }

            <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Username
                </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/">Logout</Link></li>
                </ul>
            </li>
        </ul>
    )
}

export default Menu
