import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

function NavBar(props) {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light-alpha">
			<Link className="navbar-brand" to="/">
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
					<NavLink className='nav-item nav-link text-light' to="/home">Home</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className='nav-item nav-link text-light' to="/register">Register</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className='nav-item nav-link text-light' to="/about-us">About us</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className='nav-item nav-link text-light' to="/contact-us">Contact us</NavLink>
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