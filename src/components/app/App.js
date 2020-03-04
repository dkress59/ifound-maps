import React, { useState, useEffect } from 'react'
//import { Route } from 'react-router'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import './App.css'
import Header from './Header'
import Footer from './Footer'
import DataLayer from './DataLayer'

import FoundMap from '../Map'
import Login from '../Login'
import GalleryView from '../Gallery'
import Imprint from '../Imprint'

import AuthContext from '../../context/AuthContext'
import Cookies from 'universal-cookie'

import { Helmet } from 'react-helmet'
import PWAMeta from './PWAMeta'

import HttpsRedirect from 'react-https-redirect'


const App = (props) => {
	const [auth, setAuth] = useState('false')
	const startTheme = (window.matchMedia("(prefers-color-scheme: dark)").matches)
		? 'black-translucent'
		: 'default'
	const [theme, setTheme] = useState(startTheme)

	const cookies = new Cookies()


	useEffect(() => {
		if (auth === 'false' && cookies.get('token')) setAuth(cookies.get('token'))
	}, [auth])

	useEffect(() => {
		const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
		if (isDarkMode && theme === 'default') setTheme('black-translucent')
		if (!isDarkMode && theme !== 'default') setTheme('default')
	}, [theme])


	return (<>
		<Helmet>
			<title>iFound.one – Share your lucky clover with us!</title>
			<meta name="apple-mobile-web-app-status-bar-style" content={theme} />
			<meta name="description" content="A full geographical map of four-leaf clover, found all across the world." />
			<link rel="canonical" href="https://www.ifound.one/" />
		</Helmet>
		<HttpsRedirect>
			<AuthContext.Provider value={{
				token: auth,
				setToken: setAuth
			}}>
				<BrowserRouter>
					<DataLayer>
						<Header />
						<main className={"mb-0" + (isMobile ? ' mobile' : '')}>

							<Switch>
								<Route exact path='/login' component={Login} />
								<Route path='/gallery/:photoID' component={GalleryView} />
								<Route path='/gallery' component={GalleryView} />
								<Route path='/places/:placeID' component={FoundMap} />
								<Route path='/imprint' component={Imprint} />
								<Route path='/' component={FoundMap} />
							</Switch>

						</main>
						<Footer />
					</DataLayer>
				</BrowserRouter>
			</AuthContext.Provider>
		</HttpsRedirect>
		<PWAMeta />
	</>
	)

}

export default App
