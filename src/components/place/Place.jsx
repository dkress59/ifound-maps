/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react'
import { useHistory } from 'react-router'

const Place = ({ place, detail }) => {
	const history = useHistory()
	const {
		_id, name, author, created, photos, lat, lng, range,
	} = place

	if (!place)
		return <>loading…</>

	const src = photos[0]
		? `${process.env.REACT_APP_IFO_MEDIA}/view/${photos[0]}`
		: null
	const datetime = new Date(created)
	const date = `${datetime.getDay()}.${datetime.getMonth()}.${datetime.getFullYear()}`
	const time = `${datetime.getHours()}:${datetime.getMinutes()}`

	return (
		<div
			className="col"
		>
			<div
				className={`card pl-0 h-100 detail-${detail}`}
				data-id={_id}
			>
				<div className="row no-gutters h-100">
					<div className="col-12 col-sm-8 col-xl-6 col-xxl-8">
						<img
							src={src || ''}
							className="card-img"
							alt={`Foto: ${name} von ${author}`}
							onKeyPress={(e) => {
								if (e.key === 'Enter')
									history.push(`/gallery/${_id}`)
							}}
							onClick={() => { history.push(`/gallery/${_id}`) }}
						/>
					</div>
					<div className="col-12 col-sm-4 col-xl-6 col-xxl-4">
						<div className="card-body">
							<h3 className="card-title">{name}</h3>
							<h5 className="card-title">{`von ${author}`}</h5>
							<div className="d-flex flex-wrap">

								<ul className="list-group bg-transparent list-group-flush flex-fill">
									<li className="list-group-item bg-transparent text-muted">Koordinaten</li>
									<ul className="list-group bg-transparent list-group-flush">
										<li className="list-group-item bg-transparent">
											{`Breitengrad (lat): ${lat.toFixed(8)}`}
										</li>
										<li className="list-group-item bg-transparent">
											{`Längengrad (lng): ${lng.toFixed(8)}`}
										</li>
									</ul>
								</ul>

								{detail ? (
									<ul className="list-group bg-transparent list-group-flush flex-fill">
										<li className="list-group-item bg-transparent text-muted">Route</li>
										<ul className="list-group bg-transparent list-group-flush">
											<li className="list-group-item bg-transparent">
												<a href={`http://maps.apple.com/?daddr=${lat},${lng}`}>
													Maps
												</a>
											</li>
											<li className="list-group-item bg-transparent">
												<a href={`https://waze.com/ul?ll=${lat},${lng}`}>Waze</a>
											</li>
										</ul>
									</ul>
								) : null}
								{/*
								<p className="card-text">
									This is a wider card with supporting text below as a natural lead-in
									to additional content. This content is a little bit longer.
								</p>
								*/}

							</div>
							<p className="card-text">
								<small className="text-muted">
									{`am ${date}, um ${time} Uhr`}
								</small>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Place)
