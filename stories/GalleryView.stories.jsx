/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import '../src/index.css'
import '../src/assets/bootstrap.css'
import '../src/components/app/App.css'
import React from 'react'
import { Router, Route } from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import { mockHistory } from '../.mocks/history'
import places from '../.mocks/places.json'
import GalleryView from '../src/components/gallery/GalleryView'
import PlaceContext from '../src/context/PlaceContext'
import MapContext from '../src/context/MapContext'

const photos = places.map((plc) => {
	const img = new Image()
	const thumb = new Image()
	img.alt = 'Photo document'
	thumb.alt = 'Photo thumbnail'
	img.className = 'full'
	thumb.className = 'thumbnail'
	img.src = `${process.env.REACT_APP_IFO_MEDIA}/view/${plc.photos[0]}`
	thumb.src = `${process.env.REACT_APP_IFO_MEDIA}/view/${plc.photos[0]}?thumb=true`
	if (plc.photos.length > 0)
		return {
			_id: plc._id,
			img,
			created: plc.created,
			place: { lat: plc.lat, lng: plc.lng },
		}

	return false
})

export default {
	title: 'GalleryView',
	component: GalleryView,
}

const Template = (args) => <GalleryView {...args} />

export const Overview = Template.bind({})

Overview.args = {
	// index: '',
	// match: { params: { placeID: null } },
}
Overview.decorators = [(Story) => (
	<main>
		<Router history={mockHistory('/gallery')}>
			<MapContext.Provider value={{ coords: { lat: 51.227422999999995, lng: 6.8021385 } }}>
				<PlaceContext.Provider value={{ places, photos }}>
					<Route path="/gallery">
						<Story />
					</Route>
				</PlaceContext.Provider>
			</MapContext.Provider>
		</Router>
	</main>
)]

