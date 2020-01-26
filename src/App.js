import React, { useState, useEffect } from 'react'
import FoundMap from './components/map/Map'
import './App.css'

const App = () => {

	const [places, setPlaces] = useState([])

	useEffect(() => {
		fetch('https://ifound-rest.herokuapp.com/api/places/')
			.then((res => res.json()))
			.then((res) => {
				//console.log('Places', res)
				setPlaces(res.places)
			})
	}, [])


	return (
		<>
			<header className="mt-2 mb-3">
				<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
					<a className="navbar-brand">
						<h1 className="h3">iFound.one!</h1>
					</a>
					<ul className="navbar-nav mr-auto w-100 justify-content-end">
						<li className="nav-item active">
							<a className="nav-link" href="#">Karte <span className="sr-only">(current)</span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Galerie</a>
						</li>
					</ul>
				</nav>
			</header>
			<main className="mb-2">
				<FoundMap id="map" places={places} />
			</main>
		</>
	);

}

export default App
