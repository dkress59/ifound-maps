/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import './Gallery.scss'
import React, {
	useState, useContext, useEffect, Suspense, lazy,
} from 'react'
import { isMobile } from 'react-device-detect'

import { Helmet } from 'react-helmet'
import { useLocation, useParams } from 'react-router'
import PlaceContext from '../context/PlaceContext'
import MapContext from '../context/MapContext'

import {
	ImageIcon, GridIcon, FilterIcon, DeleteIcon, LoadingCircle,
} from './app/Icons'


const GalleryItems = lazy(() => import('./gallery/GalleryItems'))//eslint-disable-line


const shuffle = (a) => {//eslint-disable-line
	let j
	let x
	let i
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1))
		x = a[i]
		a[i] = a[j]
		a[j] = x
	}
	return a
}

const deg2rad = (deg) => deg * (Math.PI / 180)

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
	const R = 6371 // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1) // deg2rad below
	const dLon = deg2rad(lon2 - lon1)
	const a =		Math.sin(dLat / 2) * Math.sin(dLat / 2)
		+ Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
		* Math.sin(dLon / 2) * Math.sin(dLon / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const d = R * c // Distance in km
	return d
}


const GalleryView = (props) => {
	const { photos, places } = useContext(PlaceContext)
	const { state } = useLocation()
	const { photoID } = useParams()
	// const [pinchScale, setPinchScale] = useState(1);//eslint-disable-line
	// const [pinchCenter, setPinchCenter] = useState({ x: 'center', y: 'center' });//eslint-disable-line
	const [pinchLevel, setPinchLevel] = useState((isMobile) ? 2 : 0)
	const [distInput, setDistInput] = useState(0)
	const [filtered, setFiltered] = useState([])
	const { coords } = useContext(MapContext)
	const [searchInput, setSearchInput] = useState('')
	const selectedSet = (filtered.length) ? filtered : photos
	const [collapsed, setCollapsed] = useState(isMobile)

	/* const index = (Object.keys(props.match.params).length)
		? props.match.params.placeID : (props.location && props.location.state && props.location.state.place)
			? props.location.state.place : 0 */
	const index = photoID || (state && state.photo
		? state.photo
		: null)


	const searchPlaces = (input) => {
		setSearchInput(input)
		if (pinchLevel === 4)
			setPinchLevel(3 - !isMobile)
		if (!input.length)
			return setFiltered([])
		const results = places.filter((plc) => {
			if (
				plc.name.toUpperCase().indexOf(input.toUpperCase()) > -1
				|| plc.author.toUpperCase().indexOf(input.toUpperCase()) > -1
				|| plc._id.toUpperCase().indexOf(input.toUpperCase()) > -1
			)
				return true
			return false
		})
		if (!results.length)
			return null
		const filterSet = results.map((plc) => photos.filter((pht) => plc._id === pht._id)[0])
		// console.log(results, filtered)
		setFiltered(filterSet)
	}

	const title = (photoID && places.length)
		? state && state.photo
			? places.filter((p) => p._id === state.photo).length
				&& places.filter((p) => p._id === state.photo)[0].name
			: places.filter((p) => p._id === photoID).length
				&& places.filter((p) => p._id === photoID)[0].name
		: null
	console.log(photoID)


	useEffect(() => {
		const filterSet = photos.filter((photo) => {
			if (!distInput)
				return false
			const dist = getDistanceFromLatLonInKm(coords.lat, coords.lng, photo.place.lat, photo.place.lng) * 25
			if (dist <= distInput)
				return true
			return false
		})
		if (filterSet.length !== filtered.length)
			setFiltered(filterSet)
	}, [distInput])//eslint-disable-line

	useEffect(() => {
		if (index) {
			searchPlaces(index)
			if (places.filter((p) => p._id === index).length)
				setPinchLevel(4)
			// console.log(places)
		}
	}, [photos])//eslint-disable-line


	if (!photos.length)
		return (<div className="loadingScreen">Lädt...</div>)

	return (
		<>
			<Helmet>
				{/* <title>iFound.one – Find four-leaf clover all across the world!</title> */}
				<title>
					iFound.one
					{' '}
					{title ? `– ${title}` : ''}
					{' '}
					– Finde vierblättrigen Klee auf der ganzen Welt!
				</title>
				{/* <meta name="description" content="Scroll through our gallery and see all of the beautiful photos,
				shared by users all scross the world! Find four-leaf clover near you or in
				any area you pinpointed on our map!" /> */}
				<meta
					name="description"
					content="Blätter' durch unsere Galerie und sieh all die schönen Fotos, die hier von
					Benutzern auf der ganzen Welt ausgetauscht werden! Finde ein vierblättriges Kleeblatt
					in deiner Nähe oder in einem beliebigen Gebiet, das auf unserer Karte eingetragen wurde!"
				/>
				<lin
					rel="canonical"
					href={`https://www.ifound.one/gallery/${photoID || ''} `}
				/>
				<meta property="og:type" content="website" />
				<meta property="og:title" content={`iFound.one${title ? ` – ${title}` : ''}`} />
				<meta property="og:site_name" content="iFound.one" />
				<meta property="og:url" content="https://www.ifound.one/gallery/" />
				<meta property="og:image" content="https://www.ifound.one/logo.svg" />
				{/* <meta property="og:description" content="Scroll through our gallery and see all of the
				beautiful photos, shared by users all scross the world! Find four-leaf clover near you or
				in any area you pinpointed on our map!" /> */}
				<meta
					property="og:description"
					content="Blätter' durch unsere Galerie und sieh all die schönen Fotos, die hier von
					Benutzern auf der ganzen Welt ausgetauscht werden! Finde ein vierblättriges Kleeblatt
					in deiner Nähe oder in einem beliebigen Gebiet, das auf unserer Karte eingetragen wurde!"
				/>
			</Helmet>
			<Suspense
				fallback={(
					<div
						className="position-absolute w-100 h-100 flex-grow-1 text-center d-flex justify-content-center align-items-center"
					>
						<LoadingCircle />
					</div>
				)}
			>
				<div
					className={`gallery level-${pinchLevel}`}
					style={{ /* transform: `scale(${pinchScale})`, transformOrigin: `${pinchCenter.x}px ${pinchCenter.y}px` */ }}
				>
					<GalleryItems selectedSet={selectedSet} places={places} />
				</div>
				<section id="filterBox" className={`card shadow${(isMobile && collapsed) ? ' collapsed' : ''}`}>
					<div className="card-header bg-secondary text-white text-right">
						<button
							type="button"
							className="btn btn-sm btn-outline-light"
							aria-label="search parameters"
							disabled={!isMobile}
							onClick={() => {
								if (isMobile)
									setCollapsed(!collapsed)
							}}
						>
							<FilterIcon />
						</button>
					</div>
					<div className="card-body text-dark">
						<div className="d-flex flex-row flex-wrap mb-4">
							<div style={{ flex: 1, flexBasis: '96px', position: 'relative' }}>
								<input
									type="text"
									className="w-100 h-100"
									value={searchInput}
									placeholder=" Suchen…"
									// aria-label="search by id, name or author"
									aria-label="Nach ID, Namen oder Autor suchen"
									onChange={(e) => { searchPlaces(e.target.value) }}
								/>
								<DeleteIcon onClick={() => searchPlaces('')} />
							</div>
							<div className="btn-group ml-3" role="group" aria-label="grid columns / image size">
								<button
									type="button"
									className="btn btn-primary"
									// aria-label="less columns / larger images"
									aria-label="weniger Spalten / größere Darstellung"
									onClick={() => {
										if (pinchLevel < 4)
											setPinchLevel(pinchLevel + 1)
									}}
								>
									<ImageIcon />
								</button>
								<button
									type="button"
									className="btn btn-primary"
									// aria-label="more columns / smaller images"
									aria-label="mehr Spalten / kleinere Darstellung"
									onClick={() => {
										if (pinchLevel > -1 && selectedSet.length > 1)
											setPinchLevel(pinchLevel - 1)
									}}
								>
									<GridIcon />
								</button>
							</div>
						</div>
						<input
							key="distance-input"
							type="range"
							style={{ width: '100%', minWidth: '96px' }}
							className="form-control-range mt-4"
							id="formControlDistance"
							value={distInput}
							step="10"
							onChange={(e) => { setDistInput(parseInt(e.target.value, 10)) }}
							onInput={(e) => { setDistInput(parseInt(e.target.value, 10)) }}
							// aria-label="filter results based on the distance to your position"
							aria-label="Ergebnisse auf der Entfernung zur angegebenen Position basierend filtern"
						/>
						<label
							htmlFor="formControlDistance"
							className="text-center mt-2"
							style={{
								width: '100%',
								display: 'block',
							}}
							// aria-label="distance to your position"
							aria-label="Entfernung zur angegebenen Position"
						>
							{(() => {
								if (distInput !== 0)
									return `Bis zu ${distInput * 40 / 1000}km entfernt`
							})()}
						</label>
					</div>
				</section>
			</Suspense>
		</>
	)
}

export default GalleryView
