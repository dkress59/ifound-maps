//import 'core-js/es/map'//polyfills
//import 'core-js/es/set'//polyfills
import './index.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './components/Login'
import Map from './components/map/Map'
import * as serviceWorker from './serviceWorker'
//import { Route } from 'react-router'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import './assets/custom-bootstrap.css'
import GalleryView from './components/Gallery'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Router = (props) => {
	const [auth, setAuth] = useState('false')

	useEffect(() => {
		if (auth === 'false' && cookies.get('token')) setAuth(cookies.get('token'))
	}, [])
	return (
		<BrowserRouter>
			<AuthContext.Provider value={{
				token:auth,
				setToken: setAuth
				}}>
				<Switch>
					<Route exact path='/login'>
						<App><Login /></App>
					</Route>
					<Route exact path='/gallery'>
						<App><GalleryView /></App>
					</Route>
					{/* <Route path='/places/:placeID'>
						<App><Map /></App>
					</Route>
					<Route path='/places'>
						<App><Map /></App>
					</Route> */}
					<Route path='/'>
						<App><Map /></App>
					</Route>
				</Switch>
			</AuthContext.Provider>
		</BrowserRouter>
	)
}

ReactDOM.render((<Router />), document.getElementById('root'))


serviceWorker.register()//caching on: register(), off: unregister()
