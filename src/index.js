import './index.css'
import './assets/bootstrap.sass'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import App from './App'
//import 'core-js/es/map'//polyfills
//import 'core-js/es/set'//polyfills
//import 'react-app-polyfill/ie9'
//import 'react-app-polyfill/stable'
import 'es5-shim'
import 'es6-shim'
import 'es7-shim'


ReactDOM.render((<App />), document.getElementById('root'))

serviceWorker.register()//caching on: register(), off: unregister()
