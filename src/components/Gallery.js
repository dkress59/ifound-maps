import './Gallery.scss'
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'//eslint-disable-line
import Image from 'react-image-webp'
import Hammer from 'react-hammerjs'
import PlaceContext from '../context/PlaceContext'
import { isMobile } from 'react-device-detect'

const GalleryView = (props) => {

	const { photos } = useContext(PlaceContext)
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
			return (
				<figure key={"photo-" + photo._id}>
					<Image src={photo.img.src} webp={photo.img.src + '.webp'} alt="This is a descriptive subtitle." className="photo" />
					<figcaption>
						<h3 className="display-4">Title</h3>
						<p className="h2">This is a descriptive subtitle.</p>
					</figcaption>
				</figure>
			)
		})
	}

	if (!photos.length) return (<div className="loadingScreen">Loading...</div>)

	return (
		<Hammer
			/*onPinchStart={e => {
				setPinchCenter({x:e.center.x, y:e.center.y})
			}}
			onPinch={e => {
				if (e.scale > .5 && e.scale < 1.5) setPinchScale(e.scale)
			}}*/
			onPinchEnd={e => {
				if (e.scale > 1 && pinchLevel < 4) setPinchLevel(pinchLevel + 1)
				if (e.scale < 1 && pinchLevel > -2) setPinchLevel(pinchLevel - 1)
			}}
			options={{
				recognizers: {
					pinch: { enable: true },
					pan: { enable: true },
				}
			}}
		>
			<div className={"gallery level-" + pinchLevel} style={{ transform: `scale(${pinchScale})`, transformOrigin: `${pinchCenter.x}px ${pinchCenter.y}px` }}>
				{loadPhotos()}
			</div>
		</Hammer>
	)
}

export default GalleryView