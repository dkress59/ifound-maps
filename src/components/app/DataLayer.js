import React, { useState, useEffect } from 'react'
import PlaceContext from '../../context/PlaceContext'
import MapContext from '../../context/MapContext'

const DataLayer = (props) => {
	const [photos, setPhotos] = useState([])
	const [coords, setCoords] = useState({ lat: 51.2432, lng: 6.7822 })
	const [center, setCenter] = useState({ lat: 51.2432, lng: 6.7822 })
	const [places, setPlaces] = useState([])
	const [range, setRange] = useState(0)
	const [current, setCurrent] = useState('')
	const { isLoading, setIsLoading } = props


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

		if (localStorage.getItem('places')) setPlaces( JSON.parse(localStorage.getItem('places')) )
		if (localStorage.getItem('photos')) setPhotos( JSON.parse(localStorage.getItem('photos')) )

		fetch(process.env.REACT_APP_REST_URL + '/places/')
			.then((res => res.json()))
			.then(res => {
				localStorage.setItem('places', JSON.stringify(res.places))
				updatePlaces(res.places)

				const preloaded = res.places.map(plc => {
					const img = new Image()
					const thumb = new Image()
					img.alt = 'Photo document'
					thumb.alt = 'Photo thumbnail'
					img.className = 'full'
					thumb.className = 'thumbnail'
					img.src = process.env.REACT_APP_MEDIA_URL + '/view/' + plc.photos[0]
					thumb.src = process.env.REACT_APP_MEDIA_URL + '/view/' + plc.photos[0] + '?thumb=true'
					if (plc.photos.length > 0) return {
						_id: plc._id,
						img: img,
						created: plc.created,
						place: { lat: plc.lat, lng: plc.lng }
					}
					else return false
				})

				if (preloaded.length) {
					setPhotos(preloaded)
					localStorage.setItem('photos', JSON.stringify(preloaded))
				}
			})
			.then(res => {
				if ( (isLoading && res.places.length) || (isLoading && places.length) ) setIsLoading(0)
			})

	}, [])//eslint-disable-line

	useEffect(() => {

		window.placeInterval = setInterval(() => {
			console.log('Reloading places...')
			fetch(process.env.REACT_APP_REST_URL + '/places/')
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
		if (localStorage.getItem('photos')) setPhotos( JSON.parse(localStorage.getItem('photos')) )
		const preloaded = places.map(plc => {
			const img = new Image()
			const thumb = new Image()
			img.alt = 'Photo document'
			thumb.alt = 'Photo thumbnail'
			img.className = 'full'
			thumb.className = 'thumbnail'
			img.src = process.env.REACT_APP_MEDIA_URL + '/view/' + plc.photos[0]
			thumb.src = process.env.REACT_APP_MEDIA_URL + '/view/' + plc.photos[0] + '?thumb=true'
			if (plc.photos.length > 0) return {
				_id: plc._id,
				img: img,
				created: plc.created,
				place: { lat: plc.lat, lng: plc.lng }
			}
			else return false
		})
		if (preloaded.length) {
			setPhotos(preloaded)
			localStorage.setItem('photos', JSON.stringify(preloaded))
		}
	}, [places])

	if (!isLoading) return (
		<PlaceContext.Provider value={{
			places: places,
			setPlaces: setPlaces,
			photos: photos,
			setPhotos: setPhotos,
			current: current,
			setCurrent: setCurrent
		}}>
			<MapContext.Provider value={{
				coords: coords,
				setCoords: setCoords,
				center: center,
				setCenter: setCenter,
				range: range,
				setRange: setRange
			}}>
				{props.children}
			</MapContext.Provider>
		</PlaceContext.Provider>
	)
	else return null

}

export default DataLayer