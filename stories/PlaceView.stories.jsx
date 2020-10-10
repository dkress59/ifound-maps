/* eslint-disable react/jsx-props-no-spreading */
import '../src/index.css'
import '../src/assets/bootstrap.css'
import '../src/components/app/App.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import places from '../.mocks/places.json'
import PlaceView from '../src/components/place/PlaceView'
import PlaceContext from '../src/context/PlaceContext'

export default {
	title: 'PlaceView',
	component: PlaceView,
	decorators: [(Story) => (
		<main>
			{/* <BrowserRouter> */}
			<PlaceContext.Provider value={{ places }}>
				{/* <Route path="/places"> */}
				<Story />
				{/* </Route> */}
			</PlaceContext.Provider>
			{/* </BrowserRouter> */}
		</main>
	)],
}

const Template = () => <PlaceView match={{ params: { placeId: null } }} />

export const Overview = Template.bind({})

/* Overview.args = {
	// index: '',
	match: { params: { placeId: null } },
} */
