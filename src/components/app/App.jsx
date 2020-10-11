import React, { useState, useEffect } from 'react'
// import { Route } from 'react-router'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import './App.css'
import Cookies from 'universal-cookie'
import { Helmet } from 'react-helmet'
import Header from './Header'
import Footer from './Footer'
import DataLayer from '../data/DataLayer'

import MapView from '../map/MapView'
import Login from '../Login'
import GalleryView from '../gallery/GalleryView'
import Imprint from '../Imprint'

import AuthContext from '../../context/AuthContext'

import PWAMeta from '../data/PWAMeta'
import PlaceView from '../place/PlaceView'


const App = () => {
	const [auth, setAuth] = useState('false')
	const startTheme = (window.matchMedia('(prefers-color-scheme: dark)').matches)
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
			? ''
			: 'zoomOut animated fast'
		return (
			<div
				id="splash-screen"
				className={`${fade}w-100 h-100 d-flex align-items-center justify-content-center bg-theme`}
			>
				<img
					src={`${process.env.REACT_APP_IFO_URL}/logo.svg`}
					alt="iFound.one lädt…"
					className={zoom}
					style={{ width: '100%', height: 'auto', maxWidth: '512px' }}
				/>
			</div>
		)
	}


	useEffect(() => {
		if (auth === 'false' && cookies.get('token'))
			setAuth(cookies.get('token'))
	}, [auth])//eslint-disable-line

	useEffect(() => {
		const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
		if (isDarkMode && theme === 'default')
			setTheme('black-translucent')
		if (!isDarkMode && theme !== 'default')
			setTheme('default')
	}, [theme])


	if (isLoading)
		return (
			<>
				<DataLayer isLoading={isLoading} setIsLoading={setIsLoading} />
				<Helmet>
					<link rel="canonical" href="https://www.ifound.one/" />
					<meta name="apple-mobile-web-app-status-bar-style" content={theme} />
					{/* <title>iFound.one – Share your lucky clover with us!</title> */}
					<title>iFound.one – Teile deinen Glücksklee mit uns!</title>
					{/* <meta name="description" content="A full geographical map of four-leaf clover,
					found all across the world." /> */}
					<meta
						name="description"
						content="Eine geografische Karte von vierblättrigem Klee, auf der ganzen Welt gefunden."
					/>
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
				setToken: setAuth,
			}}
			>
				<BrowserRouter>
					<DataLayer isLoading={isLoading} setIsLoading={setIsLoading}>
						<Header />
						<main className={`mb-0${isMobile ? ' mobile' : ''}`}>

							<Switch>
								<Route exact path="/login">
									<Login />
								</Route>
								<Route path="/gallery/:photoID">
									<GalleryView />
								</Route>
								<Route path="/gallery">
									<GalleryView />
								</Route>
								<Route path="/map/:placeID">
									<MapView />
								</Route>
								<Route exact path="/places">
									<PlaceView />
								</Route>
								<Route path="/places/:placeID">
									<PlaceView />
								</Route>
								<Route exact path="/imprint">
									<Imprint />
								</Route>
								<Route path="/">
									<MapView />
								</Route>
								{/* <Route path='/'>
								<FourOhFour />
								</Route> */}
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

export default App
