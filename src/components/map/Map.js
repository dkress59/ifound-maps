import React, { useState, useEffect, useRef, useContext } from 'react'
import { Map, Marker, Popup } from 'react-leaflet'
import './Map.css'
import L from 'leaflet'
import trashIcon from '../../assets/trash-2.svg'
import AuthContext from '../../context/AuthContext'

import MapBoxGLLayer from './GLLayerBox'
//import MapBoxSearch from './SearchBox'
import MapBoxSearch from 'react-leaflet-search'

import MapInputBox from './InputBox'
import MapContext from '../../context/MapContext'
//import fetch from 'cross-fetch'


const FoundMap = (props) => {

	const [center, setCenter] = useState({ lat: 51.2432, lng: 6.7822 })
	const [coords, setCoords] = useState({ lat: 51.2432, lng: 6.7822 })
	const [places, setPlaces] = useState([])
	const [images, preloadImages] = useState([])

	const auth = useContext(AuthContext)

	const mapRef = useRef(null)


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

	useEffect(() => {

		window.placeInterval = setInterval(() => {
			console.log('Reloading places...')
			fetch(process.env.REACT_APP_REST_URL + '/api/places/')
				.then((res => res.json()))
				.then((res) => {
					setPlaces(res.places)
				})
		}, 6666)

		return () => {
			clearInterval(window.placeInterval)
		}
		
	})

	useEffect(() => {
		//let photos = {}
		let photos = []
		if (places && places.length > 0) places.map(place => {
			const img = new Image()
			img.key = place._id
			img.alt = 'Photo document'
			img.className = 'thumbnail'
			img.src = 'https://ifoundone.projecd.org/view/' + place.photos[0]
			//photos = {...photos, [place._id]: img.src}//works, but unallowed
			photos.push(img)
			return null
		})
		preloadImages(photos)
	}, [places])



	const myIcon = L.icon({
		iconUrl: 'https://ifoundone.projecd.org/marker.png',
		iconSize: [50, 81],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		//shadowUrl: 'my-icon-shadow.png',
		//shadowSize: [68, 95],
		//shadowAnchor: [22, 94]
	});

	/* const handleMouseMove = (e) => {
		const pos = e.latlng
		window.mouseCoords = pos
	} */

	const handleClick = (e) => {
		const pos = e.latlng
		setCoords(pos)
	}

	const deletePlace = (id) => {
		if (!id) return false
		fetch(process.env.REACT_APP_REST_URL + '/api/places/' + id, {
			headers: { 'Authorization': 'Bearer ' + auth.token },
			method: 'delete',
		})
			.then(res => {
				/* if (res.status === 200) {
					//force(!update)//dirty refresh
					setPlaces(places.filter((el) => id !== el._id))
				} */
				console.log(res)
				fetch(process.env.REACT_APP_REST_URL + '/api/places/')
					.then(nu => nu.json())
					.then(nu => {
						setPlaces(nu.places)
					})
			})
			.catch(err => {
				console.error(err)
			})
	}
	//useEffect(() => {}, [update])//dirty refresh

	const loadPlaces = () => {
		if (!places || places.length < 1) return null
		return places.map(place => {
			const pos = { lat: place.lat, lng: place.lng }
			const img = () => {
				if (place.photos.length > 0) {
					return <img
						alt="document"
						className="thumbnail"
						src={new Image().src = 'https://ifoundone.projecd.org/view/' + place.photos[0]}
					/>
				}
			}
			const name = () => {
				if (place.name && place.name !== undefined)
					return <h4 className="mb-0">{place.name}</h4>
			}
			const author = () => {
				if (place.author && place.author !== undefined)
					return <p className="m-0"><small>von </small>{place.author}</p>
			}
			return (
				<Marker position={pos} key={'marker-' + place._id} dataSaved>
					<Popup minWidth="160" maxWidth="320">
						<div className="text-center m-0">
							{img()}
							{name()}
							{author()}
						</div>
						{auth.token !== 'false' && <img className="trash feather" src={trashIcon} alt="delete" onMouseUp={() => deletePlace(place._id)} />}
					</Popup>
				</Marker>
			)
		})
	}

	const onLayerAdd = ({ layer }) => {// !! should only exec if [places] changes !!
		const mCoords = layer._latlng
		if (!layer.options.dataSaved) setCoords(mCoords) &&
			console.log('onLayerAdd', layer)
	}


	return (
		<MapContext.Provider value={{ coords: coords, setCoords: setCoords, places: places, setPlaces: setPlaces }}>
			<Map
				id="map"
				ref={mapRef}
				zoom="13"
				center={center}
				onMousedown={handleClick}
				onLayeradd={onLayerAdd}
				onbaselayerchange={(e) => { console.log(e) }}
			>
				<MapBoxGLLayer
					attribution='<a href="http://openstreetmap.org" rel="nofollow">OSM</a>'
				/>
				<Marker position={coords} key="newPlace" icon={myIcon} />
				{loadPlaces()}
				<MapBoxSearch
					className="mapSearchBox"
					//position="topleft"
					//inputPlaceholder="The default text in the search bar"
					//search={[]} // Setting this to [lat, lng] gives initial search input to the component and map flies to that coordinates, its like search from props not from user
					zoom={16} // Default value is 10
					showMarker={true}
					showPopup={false}
					//openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
					closeResultsOnClick={true} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
				//providerOptions={{ searchBounds: [] }} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
				//customProvider={undefined | { search: (searchString) => { } }} // see examples to usage details until docs are ready
				/>
			</Map>
			<MapInputBox />
		</MapContext.Provider>
	)

}


export default FoundMap