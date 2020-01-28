import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import FoundMap from './components/map/Map'
import './App.css'
import AuthContext from './context/AuthContext'

const App = () => {

	const [places, setPlaces] = useState([])
	const auth = useContext(AuthContext)

	useEffect(() => {
		fetch('https://ifound-rest.herokuapp.com/api/places/')
		//fetch('http://localhost:5000/api/places/')//dev
			.then((res => res.json()))
			.then((res) => {
				//console.log('Places', res)
				setPlaces(res.places)
			})
	}, [])


	return (
		<>
			<header className="mt-2 mb-3 navbar-expand-md">
				<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
					<a className="navbar-brand">
						<h1 className="h3">iFound.one!</h1>
					</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<ul className="navbar-nav mr-auto w-100 justify-content-end collapse navbar-collapse" id="navbarSupportedContent">
						<li className="nav-item">
							<NavLink exact to="/" className="nav-link" activeClassName="active">Karte</NavLink>
						</li>
						<li className="nav-item">
							<NavLink exact to="/gallery" className="nav-link" activeClassName="active">Galerie</NavLink>
						</li>
						<li className="nav-item">
							<NavLink exact to="/login" className="nav-link" activeClassName="active">Login</NavLink>
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
