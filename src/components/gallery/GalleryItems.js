import React, { useState } from 'react'
import { LoadingCircle } from '../app/Icons'
import { Link } from 'react-router-dom'
import Image from 'react-image-webp'
import { isMobile } from 'react-device-detect'


const GalleryItems = (props) => {
	const { selectedSet, places } = props
	if (places.length) return (
		selectedSet.map(photo => {
			const place = places.filter((p) => {
				return p._id === photo._id
			})[0]

			if (place) return (
				<Item place={place} photo={photo} />
			)
			return (<React.Fragment />)
		})
	)
	else return (<React.Fragment />)
}

const Item = props => {
	const [clicked, setClicked] = useState(!isMobile)
	const { place, photo } = props

	return (
		<figure key={"photo-" + photo._id} onClick={() => {setClicked(1)}}>
			<LoadingCircle />
			{clicked ?
				<Link to={{
					pathname: '/places/' + photo._id,
					state: { place: photo._id }
				}}>
					<PhotoElem place={place} photo={photo} />
				</Link>
			:
				<PhotoElem place={place} photo={photo} />
			}
			<figcaption>
				{place.name && <h3 className="mt-1 mb-0">{place.name}</h3>}
				{place.author && <p className="mt-0 mb-1"><small>von</small> {place.author}</p>}
			</figcaption>
		</figure>
	)
}

const PhotoElem = props => {
	const { photo, place } = props
	if (photo.img)
		return <Image src={photo.img.src} webp={photo.img.src + '.webp'} alt={place.name + " – Vier-Blättriger Klee gefunden von " + place.author} className="photo" />
	else
		return <React.Fragment />
}

export default GalleryItems