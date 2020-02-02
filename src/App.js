import React from 'react'
import Header from './components/app/Header'
import './App.css'
import { isMobile } from 'react-device-detect'

import Cookies from 'universal-cookie';

const cookie = new Cookies().get('token')
if (cookie) console.log(cookie)

const App = (props) => {

	return (
		<>
			<Header />
			<main className={"mb-3" + (isMobile ? ' mobile' : '')}>
				{props.children}
			</main>
		</>
	);

}

export default App
