import React from 'react'
import Header from './components/app/Header'
import Footer from './components/app/Footer'
import './App.css'
import { isMobile } from 'react-device-detect'
import DataLayer from './components/app/DataLayer'

const App = (props) => {

	return (
		<DataLayer>
			<Header />
			<main className={"mb-333 mb-0" + (isMobile ? ' mobile' : '')}>
				{props.children}
			</main>
			<Footer />
		</DataLayer>
	)

}

export default App
