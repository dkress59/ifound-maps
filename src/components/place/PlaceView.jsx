/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import './PlaceView.css'
import React, { useContext } from 'react'
import {
	Redirect, useHistory, useLocation, useParams,
} from 'react-router'
import PlaceContext from '../../context/PlaceContext'
import Place from './Place'

const PlaceView = () => {
	const { places } = useContext(PlaceContext)
	const history = useHistory()
	const { state } = useLocation()
	const { placeID } = useParams()

	if (!places.length)
		return <></>

	/* const index = (Object.keys(props.match.params).length)
		? props.match.params.placeID : (props.location && props.location.state && props.location.state.place)
			? props.location.state.place : 0 */
	const index = placeID || (state && state.place
		? state.place
		: null)

	const children = !index
		? (
			<>
				{places.map((place) => <Place key={Math.random()} place={place} />)}
			</>
		)
		: places.filter((p) => p._id === index).length
			? (
				<>
					<Place
						detail={1}
						place={
							places.filter((p) => p._id === index)[0]
						}
					/>
					<aside className="col-12 text-right mb-4">
						<button
							type="button"
							className="btn btn-outline-primary"
							onClick={() => { history.push('/places') }}
						>
							↩ Übersicht
						</button>
					</aside>
				</>
			) : <Redirect to="/places" />

	return (
		<div
			id="places"
			className={index ? 'row ml-0 mr-0' : 'row ml-0 mr-0 row-cols-1 row-cols-lg-2 row-cols-xxl-3'}
		>
			{children}
		</div>
	)
}

export default PlaceView
