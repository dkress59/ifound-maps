import React, { useState, useEffect } from 'react'
//import { Route } from 'react-router'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import MetaTags from 'react-meta-tags'

import './App.css'
import Header from './components/app/Header'
import Footer from './components/app/Footer'
import DataLayer from './components/app/DataLayer'

import FoundMap from './components/map/Map'
import Login from './components/Login'
import GalleryView from './components/Gallery'
import Imprint from './components/Imprint'

import AuthContext from './context/AuthContext'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const App = (props) => {
	const [auth, setAuth] = useState('false')
	const startTheme = (window.matchMedia("(prefers-color-scheme: dark)").matches)
		? 'black-translucent'
		: 'default'
	const [theme, setTheme] = useState(startTheme)


	useEffect(() => {
		if (auth === 'false' && cookies.get('token')) setAuth(cookies.get('token'))
	}, [auth])

	useEffect(() => {
		const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
		if (isDarkMode && theme === 'default') setTheme('black-translucent')
		if (!isDarkMode && theme !== 'default') setTheme('default')
	}, [])

	
	return (
		<AuthContext.Provider value={{
			token: auth,
			setToken: setAuth
		}}>
			<MetaTags>
				<meta name="apple-mobile-web-app-status-bar-style" content={theme} />
			</MetaTags>
			<BrowserRouter>
				<DataLayer>
					<Header />
					<main className={"mb-0" + (isMobile ? ' mobile' : '')}>

						<Switch>
							<Route exact path='/login' component={Login} />
							<Route exact path='/gallery' component={GalleryView} />
							<Route path='/places/:placeID' component={FoundMap} />
							<Route path='/imprint' component={Imprint} />
							<Route path='/' component={FoundMap} />
						</Switch>

					</main>
					<Footer />
				</DataLayer>
			</BrowserRouter>
		</AuthContext.Provider>
	)

}

export default App
