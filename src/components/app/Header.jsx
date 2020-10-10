/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

const logo = require('../../assets/logo.svg')

const Logo = (props) => (
	<svg className={props.className} style={props.style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
		<title>logo</title>
		<g id="Ebene_6" data-name="Ebene 6">
			<rect className="logo-1" width="640" height="640" />
			<path className="logo-2" d="M299.53,316.5H299c15.36-8.73,95.61-79.91,112.75-89.65,4.32-2.19,8.75-4.81,13.27-7.55l-13.27,7.55,15.61-27,0-.06A64,64,0,0,0,323,125.68a64,64,0,0,0-104.4,74.07l0,.06L233.8,226l-26.74-15.34,0,0A64,64,0,0,0,134,315.75,64,64,0,0,0,207,420.84l0,0L230.69,407A410.17,410.17,0,0,0,118.46,541h55a405.65,405.65,0,0,1,35.47-88A64.05,64.05,0,0,0,271,532.5a63.9,63.9,0,0,0,52-26.68,64,64,0,0,0,104.4-74.07l0-.06-15.61-27.33h0C394.14,394.13,315.43,325.72,299.53,316.5Zm0,23v-.21L299,339h.5v.29l.36.21Z" />
			<path className="logo-3" d="M207,420.84a63.76,63.76,0,0,1-22.42,9.51A410,410,0,0,0,100.2,541h18.26A410.17,410.17,0,0,1,230.69,407l-23.63,13.81Z" />
			<path className="logo-3" d="M539.78,367.75a63.92,63.92,0,0,0-26.68-52,57.12,57.12,0,0,0,24.51-35.46,64,64,0,0,0-17.9-63.05,57.44,57.44,0,0,0-43.93-17.49h0a48.13,48.13,0,0,0-14.24,1.6,63.7,63.7,0,0,0-19.33,7.92c-5.87,3.13-11.58,6.67-17.15,10-4.52,2.74-8.95,5.36-13.27,7.55-17.14,9.74-97.39,80.92-112.75,89.65h.5c15.9,9.22,94.61,77.63,112.25,87.86h0l10.9,6.32c7.44,4.32,16,9.29,16.31,9.45l0,0h0a58.38,58.38,0,0,0,36,11.58h.75a63.86,63.86,0,0,0,50.45-24.65A58.57,58.57,0,0,0,539.78,367.75Z" />
		</g>
	</svg>
)

const Header = () => {
	const align = isMobile ? 'text-right' : 'justify-content-end'

	return (
		<header className="my-2 navbar-expand-md">
			<nav className="navbar navbar-expand-lg navbar-dark">
				<a className="navbar-brand" href="/">
					<h1 className="h3">
						<Logo
							src={logo}
							alt="iFound.one Logo"
							style={{
								height: '2em',
								width: 'auto',
								margin: '-.55em -.55em -.55em -.35em',
							}}
						/>
						iFound.one!
					</h1>
				</a>
				<ul className={`navbar-nav mr-auto ${align} flex-grow-1`} id="navbarSupportedContent">
					{!isMobile // || isMobile
						? (
							<>
								<li className="nav-item">
									<NavLink
										to="/"
										isActive={(match, location) => {
										// if (!match) return false
											if (location.pathname === '/' || location.pathname.substr(0, 7) === '/map')
												return true
											return false
										}}
										className="nav-link"
										activeClassName="active"
									>
										Karte
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/gallery/"
										isActive={(match, location) => {
											// if (!match) return false
											if (
												location.pathname.substr(0, 8) === '/gallery'
												|| location.pathname.substr(0, 7) === '/places'
											)
												return true
											return false
										}}
										className="nav-link"
										activeClassName="active"
									>
										Suche
									</NavLink>
								</li>
							</>
						) : null}
					{window.matchMedia('(display-mode: standalone)').matches && (
						<li className="nav-item">
							<NavLink exact to="/login" className="nav-link" activeClassName="active">Login</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Header
