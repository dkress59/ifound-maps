import React, { useState, useEffect, useContext, useReducer } from 'react'
import PhotoContext from '../../context/PhotoContext'
import MapContext from '../../context/MapContext'

const DataLayer = (props) => {
	//const [places, setPlaces] = useState([])
	const [photos, setPhotos] = useState([])
	const [coords, setCoords] = useState({ lat: 51.2432, lng: 6.7822 })
	const [center, setCenter] = useState({ lat: 51.2432, lng: 6.7822 })
	const [places, setPlaces] = useState([])
	const [range, setRange] = useState(0)

	//const { places, setPlaces } = useContext(MapContext)

	const updatePlaces = () => { }
	const updatePhotos = () => { }

	useEffect(() => {
		const preloaded = places.map(plc => {
			const img = new Image()
			img.alt = 'Photo document'
			img.className = 'thumbnail'
			img.src = 'https://ifoundone.projecd.org/view/' + plc.photos[0]
			//return {[plc._id]: img}
			return img
		})
		console.log('keys', preloaded)
		//console.log(preloaded['5e3844d9336b5079d4ff27e2'])
		setPhotos(preloaded)
	}, [places])

	return (
		<MapContext.Provider value={{
			coords: coords,
			setCoords: setCoords,
			center: center,
			setCenter: setCenter,
			places: places,
			setPlaces: setPlaces,
			range: range,
			setRange: setRange
		}}>
			<PhotoContext.Provider value={{
				photos: photos,
				setPhotos: setPhotos
			}}>
				{props.children}
			</PhotoContext.Provider>
		</MapContext.Provider>
	)

}

export default DataLayer