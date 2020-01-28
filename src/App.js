import React, { useState, useEffect, useContext } from 'react'
import Header from './components/app/Header'
import './App.css'

const App = (props) => {

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
