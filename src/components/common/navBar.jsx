import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<NavLink className='nav-item nav-link' to="/home">Home</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className='nav-item nav-link' to="/register">Register</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className='nav-item nav-link' to="/about-us">About us</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className='nav-item nav-link' to="/contact-us">Contact us</NavLink>
				</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
	);
}

export default NavBar;