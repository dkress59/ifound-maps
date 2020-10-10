/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react'
import PlaceContext from '../../context/PlaceContext'
import Place from './Place'

const PlaceView = (props) => {
	const { places } = useContext(PlaceContext)

	const index = (Object.keys(props.match.params).length)
		? props.match.params.placeID : (props.location && props.location.state && props.location.state.place)
			? props.location.state.place : 0

	const children = !index
		? (
			<>
				{places.map((place) => <Place key={Math.random()} place={place} />)}
			</>
		)
		: (
			<Place place={
				places.filter((p) => p._id === index)[0]
			}
			/>
		)

	return (
		<div
			id="places"
			className="row row-cols-1 row-cols-lg-2 row-cols-xxl-3"
			style={{ display: 'flex', flexWrap: 'wrap' }}
		>
			{children}
		</div>
	)
}

export default PlaceView
