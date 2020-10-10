/* eslint-disable react/prop-types */
import React from 'react'

const Place = ({ place }) => {
	if (!place)
		return <>loading…</>

	const {
		_id, name, author, created, photos, lat, lng, range,
	} = place
	const src = `${process.env.REACT_APP_IFO_MEDIA}/view/${photos[0]}`
	const datetime = new Date(created)
	const date = `${datetime.getDay()}.${datetime.getMonth()}.${datetime.getFullYear()}`
	const time = `${datetime.getHours()}:${datetime.getMinutes()}`

	return (
		<div
			className="col mb-4"
		>
			<div
				className="card pl-0 h-100"
				data-id={_id}
				style={{
					backgroundColor: 'rgba(0,0,0,.05)',
				}}
			>
				<div className="row no-gutters">
					<div className="col-md-4 col-lg-6">
						<img
							src={src}
							className="card-img"
							alt="..."
							style={{
								height: '100%',
								objectFit: 'cover',
								objectPosition: 'center',
							}}
						/>
					</div>
					<div className="col-md-8 col-lg-6">
						<div className="card-body">
							<h3 className="card-title">{name}</h3>
							<h5 className="card-title">{`von ${author}`}</h5>
							<ul className="list-group bg-transparent list-group-flush">
								<li className="list-group-item bg-transparent">Koordinaten</li>
								<ul className="list-group bg-transparent list-group-flush">
									<li className="list-group-item bg-transparent">
										{`Breitengrad (lat): ${lat}`}
									</li>
									<li className="list-group-item bg-transparent">
										{`Längengrad (lng): ${lng}`}
									</li>
								</ul>
							</ul>
							{/* <p className="card-text">
								This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
							</p> */}
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

export default Place
