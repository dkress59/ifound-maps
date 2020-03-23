import React from 'react'
import { NavLink } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import './Footer.css'
import TabBar from './TabBar'
import { isPWA } from './DataLayer'

const Footer = (props) => {
	const addClass = (isPWA) ? 'pwa ' : ''

	const inherit = {
		...props,
		className: 'text-center text-flip rounded-top py-1 ' + addClass + props.className
	}
	const policy = (!window.matchMedia('(display-mode: standalone)').matches)
		? <>Beim Senden Ihrer Daten erklären Sie sich mit unseren <NavLink to="/imprint">Datenschutz&shy;bestimmungen</NavLink> einverstanden. <small>&copy; 2020 projecd.org</small></>
		: <small><NavLink to="/imprint">Impressum/Daten&shy;schutz</NavLink> &copy; 2020 projecd.org</small>

	return (
		<>
			{isMobile && <TabBar id="tab-menu" />}
			<footer {...inherit}>
				{policy}
			</footer>
		</>
	)

}

export default Footer