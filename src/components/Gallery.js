import './Gallery.css'
import React, { useState, useEffect, useContext } from 'react'
//import NavLink from 'react-router'
import { Link } from 'react-router-dom'
import PhotoContext from '../context/PhotoContext'

const GalleryView = (props) => {

	const [photos, setPhotos] = useState([])
	//const {photos, setPhotos} = useContext(PhotoContext)

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
					<Link to={"/?place=" + photo.place}>
						<img src={photo.url} alt="This is a descriptive subtitle." className="photo" />
						<figcaption>
							<h3 className="display-4">Title</h3>
							<p className="h2">This is a descriptive subtitle.</p>
						</figcaption>
					</Link>
				</figure>
			)
		})
	}
	console.log('gal', photos)

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
		<div className="gallery">
			{loadPhotos()}
		</div>
	)
}

export default GalleryView