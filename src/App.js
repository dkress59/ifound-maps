import React from 'react'
import Header from './components/app/Header'
import './App.css'

const App = (props) => {

	console.log('REST_',process.env.REST_URL)
	console.log('REACT_',process.env.REACT_APP_REST_URL)

	return (
		<>
			<Header />
			<main className="mb-3">
				{props.children}
			</main>
		</>
	);

}

export default App
