import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
	return (
		<header className="mt-2 mb-2 navbar-expand-md">
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<a className="navbar-brand">
					<h1 className="h3">iFound.one!</h1>
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<ul className="navbar-nav mr-auto w-100 justify-content-end collapse navbar-collapse" id="navbarSupportedContent">
					<li className="nav-item">
						<NavLink exact to="/" className="nav-link" activeClassName="active">Karte</NavLink>
					</li>
					<li className="nav-item">
						<NavLink exact to="/gallery" className="nav-link" activeClassName="active">Galerie</NavLink>
					</li>
					<li className="nav-item">
						<NavLink exact to="/login" className="nav-link" activeClassName="active">Login</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header