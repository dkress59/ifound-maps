import React, { useState, useEffect } from 'react'
import PlaceContext from '../../context/PlaceContext'
import MapContext from '../../context/MapContext'

const DataLayer = (props) => {
	const [photos, setPhotos] = useState([])
	const [coords, setCoords] = useState({ lat: 51.2432, lng: 6.7822 })
	const [center, setCenter] = useState({ lat: 51.2432, lng: 6.7822 })
	const [places, setPlaces] = useState([])
	const [range, setRange] = useState(0)


	const updatePlaces = (res) => {
		places.sort((a, b) => {
			if (a.created > b.created) return -1
			else return 1
		})
		res.sort((a, b) => {
			if (a.created > b.created) return -1
			else return 1
		})

		for (let i = 0; i < places.length; i++) {
			if (Object.values(res)[i]._id !== Object.values(places)[i]._id || res.length !== places.length) {
				console.log('Places updated:', { index: i, places: res })
				setPlaces(res)
				return
			}
		}
	}


	useEffect(() => {
		fetch(process.env.REACT_APP_REST_URL + '/api/places/')
			.then((res => res.json()))
			.then((res) => {
				const sorted = res.places.sort((a, b) => {
					if (a._id > b._id) return -1
					else return 1
				})
				setPlaces(sorted)
			})

	}, [])

	useEffect(() => {

		window.placeInterval = setInterval(() => {
			console.log('Reloading places...')
			fetch(process.env.REACT_APP_REST_URL + '/api/places/')
				.then((res => res.json()))
				.then((res) => {
					updatePlaces(res.places)
				})
		}, 16666)

		return () => {
			clearInterval(window.placeInterval)
		}

	})

	useEffect(() => {
		const preloaded = places.map(plc => {
			const img = new Image()
			img.alt = 'Photo document'
			img.className = 'full'
			img.src = 'https://ifoundone.projecd.org/view/' + plc.photos[0]
			if (plc.photos.length > 0) return {
				_id: plc._id,
				img: img,
				created: plc.created
			}
			else return {}
		})
		if (preloaded.length) setPhotos(preloaded)
	}, [places])

	return (
		<MapContext.Provider value={{
			coords: coords,
			setCoords: setCoords,
			center: center,
			setCenter: setCenter,
			range: range,
			setRange: setRange
		}}>
			<PlaceContext.Provider value={{
				places: places,
				setPlaces: setPlaces,
				photos: photos,
				setPhotos: setPhotos
			}}>
				{props.children}
			</PlaceContext.Provider>
		</MapContext.Provider>
	)

}

export default DataLayer