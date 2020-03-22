import React from 'react'
import { LoadingCircle } from '../app/Icons'
import { Link } from 'react-router-dom'
import Image from 'react-image-webp'


const GalleryItems = (props) => {
	const { selectedSet, places } = props
	if (places.length) return (
		selectedSet.map(photo => {
			const place = places.filter((p) => {
				return p._id === photo._id
			})[0]

			if (place) return (
				<figure key={"photo-" + photo._id}>
					<LoadingCircle />
					<Link to={{
						pathname: '/places/' + photo._id,
						state: { place: photo._id }
					}}>
						{photo.img && <Image src={photo.img.src} webp={photo.img.src + '.webp'} alt={place.name + " – Vier-Blättriger Klee gefunden von " + place.author} className="photo" />}
					</Link>
					<figcaption>
						{place.name && <h3 className="mt-1 mb-0">{place.name}</h3>}
						{place.author && <p className="mt-0 mb-1"><small>von</small> {place.author}</p>}
					</figcaption>
				</figure>
			)
			return (<React.Fragment />)
		})
	)
	else return (<React.Fragment />)
}

export default GalleryItems