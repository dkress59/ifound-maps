import './Gallery.scss'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'//eslint-disable-line
import Image from 'react-image-webp'
import { isMobile } from 'react-device-detect'

import PlaceContext from '../context/PlaceContext'
import MapContext from '../context/MapContext'

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
	const [filtered, setFiltered] = useState([])
	const { coords } = useContext(MapContext)
	const [searchInput, setSearchInput] = useState('')
	const pickSet = (filtered.length) ? filtered : photos

	const searchPlaces = (input) => {
		setSearchInput(input)
		if (!input.length) return
		const pick = (filtered.length)
			? filtered
			: places
		const results = pick.filter((plc) => {
			if (plc.name.toUpperCase().indexOf(input.toUpperCase()) > -1 || plc.author.toUpperCase().indexOf(input.toUpperCase()) > -1) return true
			else return false
		})
		console.log(results, filtered)
		if (results.length) setFiltered(results)
	}

	useEffect(() => {
		const filterSet = photos.filter((photo) => {
			//if (!distInput) return true
			const dist = getDistanceFromLatLonInKm(coords.lat, coords.lng, photo.place.lat, photo.place.lng) * 25
			if (dist <= distInput) return true
			else return false
		})
		if (filterSet.length !== filtered.length) setFiltered(filterSet)
	}, [distInput])

	if (!photos.length) return (<div className="loadingScreen">Loading...</div>)

	return (
		<div className={"gallery level-" + pinchLevel} style={{ transform: `scale(${pinchScale})`, transformOrigin: `${pinchCenter.x}px ${pinchCenter.y}px` }}>
			<section
				className="d-flex align-items-center justify-content-end w-100"
				style={{
					zIndex: 9999,
					transform: 'translateZ(0)',
					perspective: 1000
				}}
			>
				{/* <input
					type="text"
					value={searchInput}
					onChange={e => { searchPlaces(e.target.value) }}
				/> */}
				<input
					key="distance-input"
					type="range"
					style={{ width: '96px' }}
					className={"form-control-range mb-2 mt-2"}
					id="formControlDistance"
					value={distInput}
					step="10"
					onInput={e => { setDistInput(parseInt(e.target.value)) }}
				/>
				<label htmlFor="formControlDistance">
					{(() => { if (distInput != 0) return distInput * 40 + 'm Umkreis' })()}
				</label>
			</section>
			{/*shuffle(*/pickSet.map(photo => {
				const place = places.filter((p) => {
					return p._id === photo._id
				})[0]

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
	)
}

export default GalleryView