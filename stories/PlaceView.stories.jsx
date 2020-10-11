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
import PlaceView from '../src/components/place/PlaceView'
import PlaceContext from '../src/context/PlaceContext'

export default {
	title: 'PlaceView',
	component: PlaceView,
}

const Template = (args) => <PlaceView {...args} />

export const Overview = Template.bind({})
export const Single = Template.bind({})

Overview.args = {
	// index: '',
	// match: { params: { placeID: null } },
}
Overview.decorators = [(Story) => (
	<main>
		<Router history={mockHistory('/places')}>
			<PlaceContext.Provider value={{ places }}>
				<Route path="/places">
					<Story />
				</Route>
			</PlaceContext.Provider>
		</Router>
	</main>
)]


Single.args = {
	// index: places[0]._id,
	// match: { params: { placeID: places[0]._id } },
}
Single.decorators = [(Story) => (
	<main>
		<Router history={mockHistory(`/places/${places[0]._id}`)}>
			<PlaceContext.Provider value={{ places }}>
				<Route path="/places/:placeID">
					<Story />
				</Route>
			</PlaceContext.Provider>
		</Router>
	</main>
)]
