import React, { useState, useEffect, useRef, useContext } from 'react'
import { Map, Marker, Popup, Circle } from 'react-leaflet'
import './Map.css'
import L from 'leaflet'
import qs from 'query-string'
import Image from 'react-image-webp'

import trashIcon from '../../assets/trash-2.svg'
import AuthContext from '../../context/AuthContext'

import MapBoxGLLayer from './GLLayerBox'
import MapBoxSearch from 'react-leaflet-search'

import MapInputBox from './InputBox'
import { isMobile } from 'react-device-detect'

import MapContext from '../../context/MapContext'
import PlaceContext from '../../context/PlaceContext'



const FoundMap = (props) => {

	const { token } = useContext(AuthContext)
	const [zoomX, setZoomX] = useState(16)
	const { places, setPlaces, photos } = useContext(PlaceContext)
	const { coords, setCoords, center, setCenter, range } = useContext(MapContext)

	const mapRef = useRef(null)
	const indexRef = useRef(null)

	const index = (qs.parse(window.location.search).place)
		? qs.parse(window.location.search).place : (props.index)
			? props.index : 0

	const cloverIcon = L.icon({
		iconUrl: './clover-2.svg',
		iconSize: [64, 64],
		iconAnchor: [10, 64],
		popupAnchor: [-3, -76],
		shadowUrl: './clover-shadow.svg',
		shadowSize: [64, 56],
		shadowAnchor: [10, 56]
	});


	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {// !! check for URL & file !! //
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
	}, [])//eslint-disable-line

	useEffect(() => {
		if (indexRef.current) indexRef.current.leafletElement.fire('click')// !! ?? !! //
	}, [places])

	useEffect(() => {// !! this picks up external marker addings (doesnt it?) !! // onlayeradd?
		if (!isMobile) setCenter(coords)
	}, [coords])//eslint-disable-line



	const handleClick = (e) => {// !! Bubblin like damn !! //
		const pos = e.latlng
		setCoords(pos)
	}

	const deletePlace = (id) => {
		if (!id) return false
		fetch(process.env.REACT_APP_REST_URL + '/api/places/' + id, {
			headers: { 'Authorization': 'Bearer ' + token },
			method: 'DELETE',
		})
			.then(res => {
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

	const Places = () => {
		if (!places || places.length < 1) return <></>
		return places.map(place => {
			const pos = { lat: place.lat, lng: place.lng }
			const ref = (place._id === index) ? indexRef : null
			const imgObj = photos.filter(photo => { return photo._id === place._id })
			const img = (imgObj.length > 0)
				? () => {
					return <Image src={imgObj[0].img.src + '?thumb=true'} webp={imgObj[0].img.src + '.webp?thumb=true'} className="thumbnail" />
				}
				: () => { }
			return (
				<div key={'circleMarker-' + place._id}>
					{(place.range && place.range > 0) && <Circle center={[pos.lat, pos.lng]} radius={place.range} />}
					<Marker
						icon={cloverIcon}
						position={pos}
						ref={ref}
						dataSaved>
						<Popup minWidth="160" maxWidth="320" closeButton="false">
							<div className="text-center m-0">
								{img()}
								{(place.name && place.name !== undefined) ? <h4 className="mb-0">{place.name}</h4> : null}
								{(place.author && place.author !== undefined) ? <p className="m-0"><small>von </small>{place.author}</p> : null}
							</div>
							{token !== 'false' && <img className="trash feather" src={trashIcon} alt="delete" onClick={(e) => deletePlace(place._id)} />}
						</Popup>
					</Marker>
				</div>
			)
		})
	}


	return (
		<>
			<Map
				id="map"
				ref={mapRef}
				zoom={zoomX}
				center={center}
				onClick={handleClick}
				onZoomEnd={e => setZoomX(e.target._zoom)}
			>
				<MapBoxGLLayer
					//onMouseDown={e => console.log('tile', e)}
					attribution='<a href="http://openstreetmap.org" rel="nofollow">OSM</a>'
				/>
				<Places />
				{range > 0 ? <Circle center={[coords.lat, coords.lng]} radius={range} /> : null}
				<Marker
					key="newPlace"
					position={coords}
				/>
				<MapBoxSearch
					className="mapSearchBox"
					//position="topleft"
					//inputPlaceholder="The default text in the search bar"
					//search={[]} // Setting this to [lat, lng] gives initial search input to the component and map flies to that coordinates, its like search from props not from user
					zoom={16} // Default value is 10
					showMarker={false}
					showPopup={false}
					//openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
					closeResultsOnClick={true} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
				//providerOptions={{ searchBounds: [] }} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
				//customProvider={undefined | { search: (searchString) => { } }} // see examples to usage details until docs are ready
				/>
			</Map>
			<MapInputBox />
		</>
	)

}


export default FoundMap