import './Gallery.scss'
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Image from 'react-image-webp'
import { isMobile } from 'react-device-detect'

import PlaceContext from '../context/PlaceContext'
import MapContext from '../context/MapContext'

import { ImageIcon, GridIcon } from '../assets/Icons'

const shuffle = (a) => {//eslint-disable-line
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);  // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

const deg2rad = (deg) => {
	return deg * (Math.PI / 180)
}

const GalleryView = (props) => {

	const { photos, places } = useContext(PlaceContext)
	const [pinchScale, setPinchScale] = useState(1);//eslint-disable-line
	const [pinchCenter, setPinchCenter] = useState({ x: 'center', y: 'center' });//eslint-disable-line
	const [pinchLevel, setPinchLevel] = useState((isMobile) ? 1 : -1)
	const [distInput, setDistInput] = useState(0)
	const [filteredPhotos, setFilteredPhotos] = useState([])
	const { coords } = useContext(MapContext)
	const [searchInput, setSearchInput] = useState('')
	const pickSet = (filteredPhotos.length) ? filteredPhotos : photos

	const searchPlaces = (input) => {
		setSearchInput(input)
		if (!input.length) return setFilteredPhotos([])
		const results = places.filter((plc) => {
			if (plc.name.toUpperCase().indexOf(input.toUpperCase()) > -1 || plc.author.toUpperCase().indexOf(input.toUpperCase()) > -1) return true
			else return false
		})
		if (!results.length) return null
		const filterSet = results.map((plc) => {
			return photos.filter((pht) => {
				return plc._id == pht._id
			})[0]
		})
		console.log(results, filteredPhotos)
		setFilteredPhotos(filterSet)
	}

	useEffect(() => {
		const filterSet = photos.filter((photo) => {
			//if (!distInput) return true
			const dist = getDistanceFromLatLonInKm(coords.lat, coords.lng, photo.place.lat, photo.place.lng) * 25
			if (dist <= distInput) return true
			else return false
		})
		if (filterSet.length !== filteredPhotos.length) setFilteredPhotos(filterSet)
	}, [distInput])

	if (!photos.length) return (<div className="loadingScreen">Loading...</div>)

	return (
		<>
			<div className={"gallery level-" + pinchLevel} style={{ transform: `scale(${pinchScale})`, transformOrigin: `${pinchCenter.x}px ${pinchCenter.y}px` }}>
				{/*shuffle(*/pickSet.map(photo => {
					const place = places.filter((p) => {
						return p._id === photo._id
					})[0]
					console.log(place, photo)

					return (
						<figure key={"photo-" + photo._id}>
							<Link to={{
								pathname: '/places/' + photo._id,
								state: { place: photo._id }
							}}>
								<Image src={photo.img.src} webp={photo.img.src + '.webp'} alt="This is a descriptive subtitle." className="photo" />
							</Link>
							<figcaption>
								<h3 className="mt-1 mb-0">{place.name}</h3>
								<p className="mt-0 mb-1">by {place.author}</p>
							</figcaption>
						</figure>
					)
				})/*)*/}
			</div>
			<section className="card shadow" style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
				<div className="card-header bg-secondary text-white text-right">Suchfilter</div>
				<div className="card-body text-dark">
					<div className="d-flex flex-row flex-wrap mb-4">
						<input
							type="text"
							//className="w-100"
							style={{ width: '6rem', flex: 1 }}
							value={searchInput}
							placeholder=" Suchen…"
							aria-label="search by name or author"
							onChange={e => { searchPlaces(e.target.value) }}
						/>
						<div className="btn-group ml-3" role="group" aria-label="grid columns / image size">
							<button
								type="button"
								className="btn btn-primary"
								aria-label="less columns / larger images"
								onClick={() => { if (pinchLevel < 4) setPinchLevel(pinchLevel + 1) }}
							>
								<ImageIcon />
							</button>
							<button
								type="button"
								className="btn btn-primary"
								aria-label="more columns / smaller images"
								onClick={() => { if (pinchLevel > -1) setPinchLevel(pinchLevel - 1) }}
							>
								<GridIcon />
							</button>
						</div>
					</div>
					<input
						key="distance-input"
						type="range"
						style={{ width: '100%', minWidth: '96px' }}
						className={"form-control-range mt-4"}
						id="formControlDistance"
						value={distInput}
						step="10"
						onChange={e => { setDistInput(parseInt(e.target.value)) }}
						onInput={e => { setDistInput(parseInt(e.target.value)) }}
						aria-label="filter results based on the distance to your current position"
					/>
					<label
						htmlFor="formControlDistance"
						className="text-center mt-2"
						style={{
							width: '100%',
							display: 'block'
						}}
						aria-label="distance to your position"
					>
						{(() => {
							if (distInput != 0) return 'Bis zu ' + distInput * 40 / 1000 + 'km entfernt'
							//else return ' '
						})()}
					</label>
				</div>
			</section>
		</>
	)
}

export default GalleryView