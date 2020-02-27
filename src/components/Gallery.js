import './Gallery.scss'
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'//eslint-disable-line
import Image from 'react-image-webp'

import PlaceContext from '../context/PlaceContext'
import { isMobile } from 'react-device-detect'

const GalleryView = (props) => {

	const { photos, places } = useContext(PlaceContext)
	const [pinchScale, setPinchScale] = useState(1);//eslint-disable-line
	const [pinchCenter, setPinchCenter] = useState({ x: 'center', y: 'center' });//eslint-disable-line
	const [pinchLevel, setPinchLevel] = useState((isMobile) ? 1 : -1)

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
	const loadPhotos = () => {
		//return shuffle(photos).map(photo => {
		return photos.map(photo => {
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
		})
	}

	if (!photos.length) return (<div className="loadingScreen">Loading...</div>)

	return (
		<div className={"gallery level-" + pinchLevel} style={{ transform: `scale(${pinchScale})`, transformOrigin: `${pinchCenter.x}px ${pinchCenter.y}px` }}>
			{loadPhotos()}
		</div>
	)
}

export default GalleryView