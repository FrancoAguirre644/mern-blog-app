import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { RootStore } from '../../interfaces/global';
import { logout } from '../../redux/actions/authAction';

const Menu = () => {

    const { auth } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const bfLoginLinks = [
        { label: 'login', path: '/login' },
        { label: 'register', path: '/register' },
    ]

    const afLoginLinks = [
        { label: 'Home', path: '/' },
        { label: 'CreateBlog', path: '/create_blog' },
    ]

    const isActive = (pn: string) => {
        if (pn === pathname) return 'active';
    }

    const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;

    return (
        <ul className="navbar-nav ms-auto">
            {
                navLinks.map((link, index) => (
                    <li className={`nav-item ${isActive(link.path)}`} key={index}>
                        <Link className="nav-link text-capitalize" to={link.path}>{link.label}</Link>
                    </li>
                ))
            }

            {
                auth.user && (
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={auth.user.avatar} alt="avatar" className='avatar' />
                        </span>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>Logout</Link></li>
                        </ul>
                    </li>
                )
            }

        </ul>
    )
}

export default Menu
