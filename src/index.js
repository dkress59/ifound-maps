import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './Login'
import * as serviceWorker from './serviceWorker'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
	<BrowserRouter>
		<Route exact path='/' component={App}/>
		<Route path='/login' component={Login}/>
	</BrowserRouter>
  ), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register()
