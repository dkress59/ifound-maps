/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import PlaceContext from '../../context/PlaceContext'
import MapContext from '../../context/MapContext'

export const isPWA = !!(window.matchMedia('(display-mode: standalone)').matches)

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
			if (a.created > b.created)
				return -1
			return 1
		})
		res.sort((a, b) => {
			if (a.created > b.created)
				return -1
			return 1
		})

		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < places.length; i++)
			if (Object.values(res)[i]._id !== Object.values(places)[i]._id || res.length !== places.length) {
				console.log('Places updated:', { index: i, places: res })
				setPlaces(res)
				return
			}
	}


	useEffect(() => {
		if (isPWA)
			document.body.classList.add('pwa')

		if (localStorage.getItem('places'))
			setPlaces(JSON.parse(localStorage.getItem('places')))
		if (localStorage.getItem('photos'))
			setPhotos(JSON.parse(localStorage.getItem('photos')))

		fetch(`${process.env.REACT_APP_IFO_API}/places/`)
			.then(((res) => res.json()))
			.then((res) => {
				localStorage.setItem('places', JSON.stringify(res.places))
				updatePlaces(res.places)

				const preloaded = res.places.map((plc) => {
					const img = new Image()
					const thumb = new Image()
					img.alt = 'Photo document'
					thumb.alt = 'Photo thumbnail'
					img.className = 'full'
					thumb.className = 'thumbnail'
					img.src = `${process.env.REACT_APP_IFO_MEDIA}/view/${plc.photos[0]}`
					thumb.src = `${process.env.REACT_APP_IFO_MEDIA}/view/${plc.photos[0]}?thumb=true`
					if (plc.photos.length > 0)
						return {
							_id: plc._id,
							img,
							created: plc.created,
							place: { lat: plc.lat, lng: plc.lng },
						}

					return false
				})

				if (preloaded.length) {
					setPhotos(preloaded)
					localStorage.setItem('photos', JSON.stringify(preloaded))
				}

				if ((isLoading && res.places.length) || (isLoading && localStorage.getItem('places')))
					setIsLoading(0)
			})
	}, [])

	useEffect(() => {
		window.placeInterval = setInterval(() => {
			console.log('Reloading places...')
			fetch(`${process.env.REACT_APP_IFO_API}/places/`)
				.then(((res) => res.json()))
				.then((res) => {
					updatePlaces(res.places)
				})
		}, 16666)

		return () => {
			clearInterval(window.placeInterval)
		}
	})

	useEffect(() => {
		if (localStorage.getItem('photos'))
			setPhotos(JSON.parse(localStorage.getItem('photos')))
		const preloaded = places.map((plc) => {
			const img = new Image()
			const thumb = new Image()
			img.alt = 'Photo document'
			thumb.alt = 'Photo thumbnail'
			img.className = 'full'
			thumb.className = 'thumbnail'
			img.src = `${process.env.REACT_APP_IFO_MEDIA}/view/${plc.photos[0]}`
			thumb.src = `${process.env.REACT_APP_IFO_MEDIA}/view/${plc.photos[0]}?thumb=true`
			if (plc.photos.length > 0)
				return {
					_id: plc._id,
					img,
					created: plc.created,
					place: { lat: plc.lat, lng: plc.lng },
				}

			return false
		})
		if (preloaded.length) {
			setPhotos(preloaded)
			localStorage.setItem('photos', JSON.stringify(preloaded))
		}
		if ((isLoading && places.length) || (isLoading && localStorage.getItem('places')))
			setIsLoading(0)
	}, [places])

	/* if (!isLoading) */
	return (
		<PlaceContext.Provider value={{
			places,
			setPlaces,
			photos,
			setPhotos,
			current,
			setCurrent,
		}}
		>
			<MapContext.Provider value={{
				coords,
				setCoords,
				center,
				setCenter,
				range,
				setRange,
			}}
			>
				{/* eslint-disable-next-line react/destructuring-assignment */}
				{props.children}
			</MapContext.Provider>
		</PlaceContext.Provider>
	)
	/* else
		return null */
}

export default DataLayer
