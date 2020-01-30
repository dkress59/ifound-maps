import './Gallery.css'
import React, { useState, useEffect } from 'react'
import NavLink from 'react-router'

const GalleryView = (props) => {

	const [photos, setPhotos] = useState([])

	useEffect(() => {
		fetch(process.env.REACT_APP_REST_URL + '/api/photos/')
			.then((res => res.json()))
			.then((res) => {
				setPhotos(res.photos)
			})
	}, [])

	useEffect(() => {

		window.galleryInterval = setInterval(() => {
			console.log('Reloading photos...')
			fetch(process.env.REACT_APP_REST_URL + '/api/photos/')
				.then((res => res.json()))
				.then((res) => {
					setPhotos(res.photos)
					console.log(res.photos)
				})
		}, 6666)

		return () => {
			clearInterval(window.galleryInterval)
		}

	})

	const loadPhotos = () => {
		return photos.map(photo => {
			return (
				<figure>
					<img src={photo.url} alt="This is a descriptive subtitle." className="photo" />
					<figcaption>
							<h3 className="display-4">Title</h3>
							<p className="h2">This is a descriptive subtitle.</p>
					</figcaption>
				</figure>
			)
		})
	}

	return (
		<div className="gallery">
			{loadPhotos()}
		</div>
	)
}

export default GalleryView