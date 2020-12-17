import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import UserMenu from '../userMenu';
import UserContext from './../../context/userContext';

function NavBar(props) {
	const { userData } = useContext(UserContext);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light-alpha">
			<Link className="navbar-brand" to="/home">
				<img
					src={logo}
					className="d-inline-block align-top"
					height="40"
					alt=""
					loading="lazy"
				/>
			</Link>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
				<li className="nav-item text-light">
					<a className='nav-item nav-link text-light' href="/home">Home</a>
				</li>
				{userData.username ? null : <li className="nav-item">
						<NavLink className='nav-item nav-link text-light' to="/register">Register</NavLink>
					</li>
				}
				<li className="nav-item">
					<NavLink className='nav-item nav-link text-light' to="/about-us">About us</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className='nav-item nav-link text-light' to="/contact-us">Contact us</NavLink>
				</li>
				</ul>
				<div className="form-inline my-2 my-lg-0">
					{ userData.username ? <UserMenu /> : null }
				</div>
			</div>
		</nav>
	);
}

export default NavBar;