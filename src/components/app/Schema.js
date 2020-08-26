import React from 'react'

const Schema = (props) => {
	const { places, photos } = props
	if (!places.length) return ''

	return (
		<section id="Schema-org" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
			{places.map(place => {
				const imgObj = photos.filter(photo => { return photo._id === place._id })
				const pos = { lat: place.lat, lng: place.lng }
				return (
					<div key={"placeSchema-" + place._id} className="schemaPlace" itemScope itemType="https://schema.org/Place">
						<meta itemProp="url" content={`${process.env.IFO_REACT_APP_URL}/places/${place._id}`} />
						<meta itemProp="latitude" content={`${pos.lat}`} />
						<meta itemProp="longitude" content={`${pos.lng}`} />
						<span itemProp="photo" itemScope itemType="https://schema.org/Photograph">
							<meta itemProp="author" content={place.author} />
							<meta itemProp="url" content={`${process.env.IFO_REACT_APP_URL}/gallery/${place._id}`} />
							<meta itemProp="embedUrl" content={imgObj.length && imgObj[0].img.src} />
							<meta itemProp="thumbnailUrl" content={imgObj.length && imgObj[0].img.src + '?thumb=true'} />
						</span>
					</div>
				)
			})}
		</section>
	)
}
export default Schema