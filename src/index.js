import './index.css'
import './assets/bootstrap.sass'
import 'jquery'
import $ from 'jquery'
import './assets/bootstrap.js'
import 'leaflet/dist/leaflet.css'
import 'animate.css'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import App from './components/app/App'
//import 'core-js/es/map'//polyfills
//import 'core-js/es/set'//polyfills
//import 'react-app-polyfill/ie9'
//import 'react-app-polyfill/stable'
import 'es5-shim'
import 'es6-shim'
import 'es7-shim'

window.$ = $


ReactDOM.render((<App />), document.getElementById('root'))

serviceWorker.register()//caching on: register(), off: unregister()
