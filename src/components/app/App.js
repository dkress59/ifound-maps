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


const App = () => {
	const [auth, setAuth] = useState('false')
	const startTheme = (window.matchMedia("(prefers-color-scheme: dark)").matches)
		? 'black-translucent'
		: 'default'
	const [theme, setTheme] = useState(startTheme)

	const cookies = new Cookies()
	const [isLoading, setIsLoading] = useState(1)

	const SplashScreen = () => {
		const fade = isLoading
			? ''
			: 'fadeOut animated fast '
		const zoom = isLoading
			? {}
			: { className: 'zoomOut animated fast' }
		return (
			<div id="splash-screen" className={fade + "w-100 h-100 d-flex align-items-center justify-content-center bg-theme"}>
				<img src={process.env.REACT_APP_URL + "/logo.svg"} alt="loading…" {...zoom} style={{ width: '100%', height: 'auto', maxWidth: '512px' }} />
			</div>
		)
	}


	useEffect(() => {
		if (auth === 'false' && cookies.get('token')) setAuth(cookies.get('token'))
	}, [auth])//eslint-disable-line

	useEffect(() => {
		const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
		if (isDarkMode && theme === 'default') setTheme('black-translucent')
		if (!isDarkMode && theme !== 'default') setTheme('default')
	}, [theme])


	if (isLoading) return (
		<>
			<DataLayer isLoading={isLoading} setIsLoading={setIsLoading} />
			<Helmet>
				<link rel="canonical" href="http://www.ifound.one/" />
				<meta name="apple-mobile-web-app-status-bar-style" content={theme} />
				{/* <title>iFound.one – Share your lucky clover with us!</title> */}
				<title>iFound.one – Teile deinen Glücksklee mit uns!</title>
				{/* <meta name="description" content="A full geographical map of four-leaf clover, found all across the world." /> */}
				<meta name="description" content="Eine vollständige geografische Karte von vierblättrigem Klee, auf der ganzen Welt gefunden." />
			</Helmet>
			<SplashScreen />
		</>
	)

	return (
		<>
			<Helmet>
				<meta name="apple-mobile-web-app-status-bar-style" content={theme} />
			</Helmet>
			<AuthContext.Provider value={{
				token: auth,
				setToken: setAuth
			}}>
				<BrowserRouter>
					<DataLayer isLoading={0} setIsLoading={()=>{}}>
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
			<SplashScreen />
			<PWAMeta />
		</>
	)

}

const RedirectedApp = () => {
	return (process.env.REACT_APP_URL !== 'http://192.168.0.27:3000')
	? <HttpsRedirect><App /></HttpsRedirect>
	: <App />
}

export default RedirectedApp
