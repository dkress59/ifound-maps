/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import './TabBar.css'
import { NavLink } from 'react-router-dom'

const TabBar = (props) => {
	const addClass = `btn-group ${props.className ? props.className : ''}`
	const addProps = { ...props, className: addClass }
	return (
		<nav {...addProps} role="group" aria-label="Hauptmenü">
			<NavLink
				to="/"
				isActive={(match, location) => {
					// if (!match) return false
					if (location.pathname === '/' || location.pathname.substr(0, 7) === '/places') return true
					return false
				}}
				className="btn btn-secondary"
				activeClassName="active"
			>
				Karte
			</NavLink>
			<NavLink
				to="/gallery/"
				isActive={(match, location) => {
					// if (!match) return false
					if (location.pathname.substr(0, 8) === '/gallery') return true
					return false
				}}
				className="btn btn-secondary"
				activeClassName="active"
			>
				Suche
			</NavLink>
		</nav>
	)
}

export default TabBar
