/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, {
	useState, useEffect, useRef, useContext,
} from 'react'
import {
	Map, Marker, Popup, Circle,
} from 'react-leaflet'
import './Map.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Image from 'react-image-webp'
import { Link, useLocation, useParams } from 'react-router-dom'

import MapBoxSearch from 'react-leaflet-search'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import AuthContext from '../context/AuthContext'

import MapBoxGLLayer from './map/GLLayerBox'

import MapInputBox from './map/InputBox'

import MapContext from '../context/MapContext'
import PlaceContext from '../context/PlaceContext'

import Schema from './app/Schema'


const coordIcon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [12.5, 41],
	iconUrl: `${process.env.REACT_APP_IFO_URL}/marker-icon.png`,
	shadowUrl: `${process.env.REACT_APP_IFO_URL}/marker-shadow.png`,
	iconRetinaUrl: `${process.env.REACT_APP_IFO_URL}/marker-icon-2x.png`,
})

const cloverIcon = L.icon({
	iconSize: [64, 64],
	iconAnchor: [10, 64],
	iconUrl: `${process.env.REACT_APP_IFO_URL}/ifound-clover.svg`,
	popupAnchor: [-3, -76],
	shadowSize: [64, 56],
	shadowAnchor: [10, 56],
	shadowUrl: `${process.env.REACT_APP_IFO_URL}/ifound-clover-shadow.svg`,
})


/* export */ const Places = (props) => {
	const {
		places, photos, index, indexRef, tempRef, token, deletePlace,
	} = props.state
	if (!places || places.length < 1)
		return <></>
	return places.map((place) => {
		const pos = { lat: place.lat, lng: place.lng }
		const ref = (place._id === index) ? indexRef : tempRef
		const imgObj = photos.filter((photo) => photo._id === place._id)
		const img = (imgObj.length > 0)
			? (
				<Image
					src={`${imgObj[0].img.src}?thumb=true`}
					webp={`${imgObj[0].img.src}.webp?thumb=true`}
					className="thumbnail"
				/>
			)
			: ''
		return (
			<div key={`circleMarker-${place._id}`}>
				{(() => {
					if (place.range && place.range > 0)
						return <Circle center={[pos.lat, pos.lng]} radius={place.range} />
				})()}
				<Marker
					icon={cloverIcon}
					position={pos}
					ref={ref}
					/* onClick={e => {
						setCurrent(place._id)
						console.log('click')
						//ref.current.leafletElement._popup.openPopup()
					}} */
					dataSaved
				>
					<Popup minWidth="160" maxWidth="320" closeButton="false">
						<div className="text-center m-0" data-id={place._id}>
							<Link to={{
								pathname: `/gallery/${place._id}`,
								state: { photo: place._id },
							}}
							>
								{img}
							</Link>
							{(() => {
								if (place.name && place.name !== undefined)
									return (
										<h4 className="mb-0" itemProp="name">
											<span>{place.name}</span>
											<a
												href={`http://maps.apple.com?daddr=${place.lat},${place.lng}`}
												rel="noopener noreferrer"
											>
												Route berechnen
											</a>
										</h4>
									)
							})()}
							{(() => {
								if (place.author && place.author !== undefined)
									return (
										<p className="m-0">
											<small>von </small>
											{place.author}
										</p>
									)
							})()}
						</div>
						{(() => {
							if (token !== 'false')
								return <div className="deletePlace" onClick={() => deletePlace(place._id)}>Löschen</div>
						})()}
					</Popup>
				</Marker>
			</div>
		)
	})
}

const FoundMap = (props) => {
	const { token } = useContext(AuthContext)
	const [zoomX, setZoomX] = useState(16)
	const {
		places, setPlaces, photos, current, setCurrent,
	} = useContext(PlaceContext)
	const {
		coords, setCoords, center, setCenter, range,
	} = useContext(MapContext)

	const mapRef = useRef(null)
	const indexRef = useRef(null)
	const { state } = useLocation()
	const { placeID } = useParams()
	const tempRef = useRef(null)

	/* const index = (Object.keys(props.match.params).length)
		? props.match.params.placeID : (props.location && props.location.state && props.location.state.place)
			? props.location.state.place : 0 */
	const index = placeID || (state && state.place
		? state.place
		: null)


	useEffect(() => {
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition((pos) => { // !! check for URL & file !! //
				setCenter({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				})
				setCoords({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				})
			})

		if (index && index !== current)
			setCurrent(index)
	}, [])//eslint-disable-line

	useEffect(() => {
		if (indexRef.current)
			(() => {
				console.log('openPopup')
				setTimeout(() => {
					indexRef.current.leafletElement.openPopup()
				}, 666)
			})()
	}, [current])

	useEffect(() => { // !! this picks up external marker addings (doesnt it?) !! // onlayeradd?
		if (!isMobile)
			setCenter(coords)
	}, [coords])//eslint-disable-line


	const handleClick = (e) => { // !! Bubblin like damn !! //
		const pos = e.latlng
		setCoords(pos)
	}

	const deletePlace = (id) => {
		if (!id)
			return false
		fetch(`${process.env.REACT_APP_IFO_API}/places/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
			method: 'DELETE',
		})
			.then((res) => {
				console.log(res)
				fetch(`${process.env.REACT_APP_IFO_API}/places/`)
					.then((nu) => nu.json())
					.then((nu) => {
						setPlaces(nu.places)
					})
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<>
			<Helmet>
				{/* <title>iFound.one – Share your lucky clover with us!</title> */}
				<title>iFound.one – Teile deinen Glücksklee mit uns!</title>
				{/* <meta name="description" content="A full geographical map of four-leaf clover,
				found all across the world. Let the world know, where to get lucky and send us a photo
				of one of your findings!" /> */}
				<meta
					name="description"
					content="Eine geografische Karte von vierblättrigem Klee, auf der ganzen Welt gefunden.
					Lass' die Welt wissen, wo das Glück zu finden ist und sende uns ein Foto von deinem Fundort!"
				/>
				<link
					rel="canonical"
					href={`https://www.ifound.one/${placeID ? `places/${placeID}` : ''}`}
				/>
				<meta property="og:type" content="website" />
				<meta property="og:title" content="iFound.one" />
				<meta property="og:site_name" content="iFound.one" />
				<meta
					property="og:url"
					content={`https://www.ifound.one/${placeID ? `places/${placeID}` : ''}`}
				/>
				{/* <meta property="og:description" content="A full geographical map of four-leaf clover,
				found all across the world. Let the world know, where to get lucky and send us a photo
				of one of your findings!" /> */}
				<meta
					property="og:description"
					content="Eine geografische Karte von vierblättrigem Klee, auf der ganzen Welt gefunden.
					Lass' die Welt wissen, wo das Glück zu finden ist und sende uns ein Foto von deinem Fundort!"
				/>
				<meta
					property="og:image"
					content={placeID
						? (photos.filter((p) => p._id === placeID).length)
							? `${photos.filter((p) => p._id === placeID)[0].img.src}?thumb=true`
							: 'https://www.ifound.one/logo.svg'
						: 'https://www.ifound.one/logo.svg'}
				/>
			</Helmet>
			<Schema places={places} photos={photos} />
			<Map
				id="map"
				ref={mapRef}
				zoom={zoomX}
				minZoom={isMobile ? 2 : 3}
				center={center}
				onClick={handleClick}
				onZoomEnd={(e) => setZoomX(e.target._zoom)}
			>
				<MapBoxGLLayer
					// onMouseDown={e => console.log('tile', e)}
					attribution='<a href="http://openstreetmap.org" rel="nofollow noreferrer">OSM</a>'
				/>
				<Places state={{
					places, photos, index, indexRef, tempRef, cloverIcon, token, deletePlace,
				}}
				/>
				{(() => {
					if (range > 0)
						return <Circle center={[coords.lat, coords.lng]} radius={range} />
				})()}
				<Marker
					key="newPlace"
					position={coords}
					icon={coordIcon}
				/>
				<MapBoxSearch
					className="mapSearchBox"
					// search={[]} // Setting this to [lat, lng] gives initial search input
					// to the component and map flies to that coordinates, its like
					// search from props not from user
					zoom={16} // Default value is 10
					showMarker={false}
					showPopup={false}
					closeResultsOnClick // By default, the search results remain when you click on one,
					// and the map flies to the location of the result. But you might want to
					// save space on your map by closing the results when one is clicked.
					// The results are shown again (without another search) when focus is returned to the search input.
				/>
			</Map>
			<MapInputBox />
		</>
	)
}


export default FoundMap
