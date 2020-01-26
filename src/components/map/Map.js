import React, { useState, useEffect, useRef } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './Map.css'


const FoundMap = (props) => {

	const [center, setCenter] = useState({ lat: 60.000, lng: 0.000 })
	const [coords, setCoords] = useState({ lat: 60.000, lng: 0.000 })

	const fileRef = useRef(null)


	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setCenter({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				})
				setCoords({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				})
			})
		}
	}, [])


	const handleMouseMove = (e) => {
		//console.log(e)
		const coords = e.latlng
		window.mouseCoords = coords
	}

	const handleClick = (e) => {
		setCoords(window.mouseCoords)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const formBody = new FormData()
		formBody.append('name', e.target.name.value)
		formBody.append('author', e.target.author.value)
		formBody.append('lat', coords.lat)
		formBody.append('lng', coords.lng)
		formBody.append('photoData', fileRef.current.files[0])
		fetch('http://ifound-rest.herokuapp.com/api/places', {
			method: 'post',
			/* headers: {
				//'Content-Type': 'application/json',
				'Content-Type': 'multipart/form-data',
				//'Origin': 'http://ifoundone.projecd.org',
			}, */
			/* body: JSON.stringify({
				'name': e.target.name.value,
				'author': e.target.author.value,
				'photoData': fileRef.current.files[0],
				'lat': coords.lat,
				'lng': coords.lng,
			}) */
			body: formBody
		})
		.then(res => {
			console.log(res)
		})
	}

	const loadPlaces = () => {
		if (props.places.length < 1) return
		return props.places.map(place => {
			const pos = { lat: place.lat, lng: place.lng }
			return (
				<Marker position={pos} key={'marker-' + place._id}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			)
		})
	}


	return (
		<Map
			id={props.id}
			//ref="bigMap"
			zoom="13"
			center={center}
			onClick={handleClick}
			onMousemove={handleMouseMove}
		>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={coords} key="newPlace">
				<Popup>
					<form onSubmit={handleSubmit}>
						<div className="form-group text-center">
							<input name="lat" type="hidden" value={coords.lat} />
							<input name="lng" type="hidden" value={coords.lng} />
							<label htmlFor="author">
								Dein Name:
							</label>
							<input
								type="text"
								//placeholder="Dein Name"
								className="form-control form-control-lg mb-2"
								name="author"
								id="author"
							/>
							<label htmlFor="name">
								Fundstelle:
							</label>
							<input
								type="text"
								//placeholder="Fundstelle"
								className="form-control mb-2"
								name="name"
								id="name"
							/>
							<label htmlFor="photoData">
								Zeig' uns dein Foto!
							</label>
							<input
								type="file"
								className="form-control-file mb-2"
								name="photoData"
								id="photoData"
								ref={fileRef}
							/>
							<button type="submit" className="btn btn-sm btn-dark w-100">Senden</button>
						</div>
					</form>
				</Popup>
			</Marker>
			{loadPlaces()}
		</Map>
	)

}


export default FoundMap