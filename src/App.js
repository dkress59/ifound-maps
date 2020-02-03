import React from 'react'
import Header from './components/app/Header'
import './App.css'
import { isMobile } from 'react-device-detect'
import DataLayer from './components/app/DataLayer'

const App = (props) => {

	return (
		<DataLayer>
			<Header />
			<main className={"mb-3" + (isMobile ? ' mobile' : '')}>
				{props.children}
			</main>
		</DataLayer>
	)

}

export default App
