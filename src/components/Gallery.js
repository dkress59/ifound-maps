import './Gallery.css'
import React, { useState, useEffect } from 'react'
//import NavLink from 'react-router'
import { Link } from 'react-router-dom'
import Image from 'react-image-webp'
import Hammer from 'react-hammerjs'

const GalleryView = (props) => {

	const [photos, setPhotos] = useState([])
	const [pinchScale, setPinchScale] = useState(1);
	const [pinchCenter, setPinchCenter] = useState({ x: 'center', y: 'center' });

	const galleryInterval = setInterval(() => {
		console.log('Reloading photos...')
		fetch(process.env.REACT_APP_REST_URL + '/api/photos/')
			.then((res => res.json()))
			.then((res) => {
				if (res.photos.length !== photos.length) setPhotos(shuffle(res.photos))// !! check for duplicates !! //
			})
	}, 26666)

	useEffect(() => {
		fetch(process.env.REACT_APP_REST_URL + '/api/photos/')
			.then((res => res.json()))
			.then((res) => {
				if (res.photos.length !== photos.length) setPhotos(shuffle(res.photos))// !! check for duplicates !! //
			})
	}, [])

	useEffect(() => {

		return () => {
			clearInterval(galleryInterval)
		}

	})

	const loadPhotos = () => {
		return photos.map(photo => {// also use index for multiple grids of 12
			return (
				<figure key={"photo-" + photo._id}>
					{/* <img src={photo.url} alt="This is a descriptive subtitle." className="photo" /> */}
					<Image src={photo.url} webp={photo.url + '.webp'} alt="This is a descriptive subtitle." className="photo" />
					<figcaption>
						<h3 className="display-4">Title</h3>
						<p className="h2">This is a descriptive subtitle.</p>
					</figcaption>
				</figure>
			)
		})
	}

	const shuffle = (a) => {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}

	if (!photos.length) return (<p>Loading...</p>)

	return (
		<Hammer
			onPinchEnd={e => console.log('end', e)}
			onPinchStart={
				e => {
					setPinchCenter({ x: e.center.x, y: e.center.y })
				}
			}
			onPinch={
				e => {
					if (e.scale > .25 && e.scale < 1.75) setPinchScale(e.scale)
				}
			}
			options={{
				recognizers: {
					pinch: { enable: true }
				}
			}}
		>
			<div className="gallery" style={{ transform: `scale(${pinchScale})`, transformOrigin: `${pinchCenter.x}px ${pinchCenter.y}px` }}>
				{loadPhotos()}
			</div>
		</Hammer>
	)
}

export default GalleryView