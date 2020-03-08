import React from 'react'
import { NavLink } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import './Footer.css'

const Footer = (props) => {

	const inherit = {
		...props,
		//className: 'text-center bg-primary text-white-50 rounded-top mt-2 pb-1'
		className: 'text-center text-flip rounded-top py-1 ' + props.className
	}
	const policy = (!window.matchMedia('(display-mode: standalone)').matches)
		? <>Beim Senden Ihrer Daten erklären Sie sich mit unseren <NavLink to="/imprint">Datenschutz&shy;bestimmungen</NavLink> einverstanden. <small>&copy; 2020 projecd.org</small></>
		: <small><NavLink to="/imprint">Impressum/Daten&shy;schutz</NavLink> &copy; 2020 projecd.org</small>

	const TabBar = props => {
		const addClass = "w-100 p-2"
		const addProps = { ...props, className: addClass + ' ' + props.className }
		return <section {...addProps}>
			<nav class="btn-group" role="group" aria-label="Hauptmenü">
				<NavLink
					to="/"
					isActive={(match, location) => {
						//if (!match) return false
						if (location.pathname === '/' || location.pathname.substr(0, 7) === '/places') return true
						else return false
					}}
					className="btn btn-secondary"
					activeClassName="active"
				>
					Karte
				</NavLink>
				<NavLink
					to="/gallery/"
					isActive={(match, location) => {
						//if (!match) return false
						if (location.pathname.substr(0, 8) === '/gallery') return true
						else return false
					}}
					className="btn btn-secondary"
					activeClassName="active"
				>
					Suche
				</NavLink>
			</nav>
		</section>
	}

	return (
		<footer {...inherit}>
			{/* isMobile && <TabBar id="tab-menu" /> */}
			{policy}
		</footer>
	)

}

export default Footer