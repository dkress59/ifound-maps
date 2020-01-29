//import 'core-js/es/map'//polyfills
//import 'core-js/es/set'//polyfills
import './index.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './Login'
import Map from './components/map/Map'
import * as serviceWorker from './serviceWorker'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import AuthContext from './context/AuthContext'

const Router = () => {
	const [auth, setAuth] = useState('false')
	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ token:auth, set: setAuth }}>
				<Switch>
					<Route exact path='/login'>
						<App><Login /></App>
					</Route>
					<Route path='/'>
						<App><Map /></App>
					</Route>
				</Switch>
			</AuthContext.Provider>
		</BrowserRouter>
	)
}

ReactDOM.render((<Router />), document.getElementById('root'))


serviceWorker.unregister()//caching on: register(), off: unregister()
