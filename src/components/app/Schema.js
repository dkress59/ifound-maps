import React from 'react'

const Schema = (props) => {
	const { places, photos } = props

	return (
		<section id="Schema-org" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
			{places.map(place => {
				const imgObj = photos.filter(photo => { return photo._id === place._id })
				const pos = { lat: place.lat, lng: place.lng }
				return (
					<div className="schemaPlace" itemScope itemType="https://schema.org/Place">
						<meta itemProp="url" content={`${process.env.REACT_APP_URL}/places/${place._id}`} />
						<meta itemProp="latitude" content={`${pos.lat}`} />
						<meta itemProp="longitude" content={`${pos.lng}`} />
						<span itemProp="photo">
							<meta itemProp="url" content={`${process.env.REACT_APP_URL}/gallery/${place._id}`} />
							<meta itemProp="embedUrl" content={imgObj[0].img.src} />
							<meta itemProp="author" content={place.author} />
							<span itemProp="thumbnail">
								<meta itemProp="embedUrl" content={imgObj[0].img.src + '?thumb=true'} />
							</span>
						</span>
					</div>
				)
			})}
		</section>
	)
}
export default Schema