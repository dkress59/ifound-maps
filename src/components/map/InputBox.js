import './InputBox.css'
import React, { useState, useRef, useContext, useEffect } from 'react'
import MapContext from '../../context/MapContext'
import PlaceContext from '../../context/PlaceContext'
import ReactDOM from 'react-dom'
import { isMobile } from 'react-device-detect'
import './InputRange.css'
//import fetch from 'cross-fetch'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'


import { UserIcon, NameIcon, MinimiseIcon, AddIcon, CameraIcon, FileIcon } from '../../assets/Icons'


const InputBox = (props) => {
	const fileRef = useRef(null)
	const cameraRef = useRef(null)
	const formRef = useRef(null)
	const { places, setPlaces } = useContext(PlaceContext)
	const { setCenter, coords, setCoords, range, setRange } = useContext(MapContext)
	const [isSending, setIsSending] = useState(0)
	const [pickGPS, setPickGPS] = useState({})

	const bodyRef = useRef(null)
	const [boxSize, setBoxSize] = useState({ w: 0, h: 0 })
	const [isCollapsed, collapse] = useState(props.collapsed || false)


	const handleSubmit = (e) => {
		e.preventDefault()
		if (isSending) return false
		const formBody = new FormData()
		formBody.append('name', e.target.name.value)
		formBody.append('author', e.target.author.value)
		formBody.append('lat', coords.lat)
		formBody.append('lng', coords.lng)
		formBody.append('range', range)
		formBody.append('photoData', fileRef.current.files[0])
		formBody.append('photoData', cameraRef.current.files[0])
		setIsSending(1)

		fetch(process.env.REACT_APP_REST_URL + '/api/places', {
			method: 'post',
			body: formBody
		})
			.then(res => { return res.json() })
			.then(res => {
				console.log(res)
				if (places) setPlaces([...places, res.newPlace])
				setIsSending(0)
				formRef.current.reset()
				setRange(0)
				if (res.newPlace.gps && res.newPlace.gps.GPSLatitude) setPickGPS({ ...calcGPS(res.newPlace.gps), placeID: res.newPlace._id })
			})
			.catch(err => {
				console.error(err)
				setIsSending(0)
			})
	}

	const className = () => {
		const paren = props.className || ''
		const defaul = 'card shadow '
		const collaps = isCollapsed ? ' collapsed' : ''
		return defaul + paren + collaps
	}

	const getGeo = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setCenter({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				})
				setCoords({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				})
			})
		}
	}

	const calcGPS = ({ GPSLatitude, GPSLongitude }) => {
		return {
			lat: GPSLatitude[0] + (GPSLatitude[1] / 60) + (GPSLatitude[2] / 3600),
			lng: GPSLongitude[0] + (GPSLongitude[1] / 60) + (GPSLongitude[2] / 3600)
		}
	}

	const photoGPS = (nuGPS) => {
		setPickGPS({})
		setCoords(nuGPS)
		setCenter(nuGPS)
		fetch(process.env.REACT_APP_REST_URL + '/api/places/' + nuGPS.placeID, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				//'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify({ //...nuGPS.newPlace,
				lat: nuGPS.lat,
				lng: nuGPS.lng
			})
		})
			.then(res => {
				console.log('PATCH', [...places, res.updatedPlace])
				//setPlaces([ ...places, res.updatedPlace ])
			})
			.catch(err => console.error(err))
	}

	const setSize = () => {
		if (!isCollapsed && boxSize.h && boxSize.w)
			return { width: boxSize.w + 'px', height: boxSize.h + 'px' }
	}


	useEffect(() => {
		const w = ReactDOM.findDOMNode(bodyRef.current).clientWidth
		const h = ReactDOM.findDOMNode(bodyRef.current).clientHeight
		if (boxSize.w < w || boxSize.h < h) setBoxSize({ w: w, h: h })
	}, [boxSize.w, boxSize.h])

	useEffect(() => {
		if (isMobile) collapse(true)
	}, [])


	return (
		<section
			id="mapInputBox"
			className={className()}
		>
			<div className="card-header text-right bg-primaryy bg-secondary text-white">
				<button
					onMouseDown={() => { collapse(!isCollapsed) }}
					className="btn btn-sm btn-outline-light"
				>
					{!isCollapsed && <MinimiseIcon />}
					{isCollapsed && <AddIcon />}
				</button>
			</div>

			<div ref={bodyRef} className="card-body text-dark" style={setSize()}>
				<form ref={formRef} onSubmit={handleSubmit} className="form-group">

					<input name="lat" type="hidden" value={coords.lat} />
					<input name="lng" type="hidden" value={coords.lng} />

					<div className="input-group mb-2">
						<Tooltip
							disabled={isMobile}
							position="top-end"
							distance={8}
							//theme="transparent"
							html={(
								<div>
									Your current location
								</div>
							)}
							arrow
						>
							<div className="input-group-prepend h-100" onClick={() => { getGeo(); isMobile && collapse(1) }}>
								<span className="btn btn-primary input-group-text" id="nameInputPrepend">
									<NameIcon />
								</span>
							</div>
						</Tooltip>
						<input
							required
							type="text"
							//placeholder="Fundstelle"
							className={"form-control"}
							disabled={isSending || pickGPS.lat}
							aria-label="Dein Fundort"
							placeholder="Fundort"
							aria-describedby="nameInputPrepend"
							title="place"
							name="name"
							id="name"
						/>
					</div>

					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="authorInputPrepend">
								<UserIcon />
							</span>
						</div>
						<input
							required
							type="text"
							//placeholder="Dein Name"
							className={"form-control"}
							disabled={isSending || pickGPS.lat}
							aria-label="Dein Name"
							placeholder="Name"
							aria-describedby="authorInputPrepend"
							title="name"
							name="author"
							id="author"
						/>
					</div>

					<label htmlFor="formControlRange" className="text-center w-100 subtitle">
						Umkreis{range > 0 ? ': ' + range + 'm' : null}
					</label>
					<input
						type="range"
						className={"form-control-range mb-2 mt-2"}
						disabled={isSending || pickGPS.lat}
						id="formControlRange"
						initial="20"
						onChange={e => { setRange(e.target.value) }}
					/>

					{(() => {
						if (isMobile && !pickGPS.lat) return (
							<label htmlFor="cameraData" style={{ width: 'calc(50% - .125em)' }} className="mr-1">
								<span className={"btn btn-primary mt-2 pb-2 mb-1 w-100" + ((isSending || pickGPS.lat) ? ' disabled' : '')}>
									<CameraIcon />
								</span>
							</label>
						)
					})()}
					<input
						type="file"
						accept="image/*"
						capture="camera"
						className="form-control-file mb-1"
						aria-label="camera input"
						name="cameraData"
						id="cameraData"
						ref={cameraRef}
						style={{ display: 'none' }}
					/>
					{(() => {
						if (isMobile && !pickGPS.lat) return (
							<label htmlFor="photoData" style={{ width: 'calc(50% - .125em)' }}>
								<span className={"btn btn-primary mt-2 mb-1 w-100" + ((isSending || pickGPS.lat) ? ' disabled' : '')}><FileIcon /></span>
							</label>
						)
					})()}
					{(() => {
						if (!isMobile && !pickGPS.lat) return (
							<label htmlFor="photoData" className="">
								<span className={"btn btn-primary mt-0 mb-1 mr-2" + ((isSending || pickGPS.lat) ? ' disabled' : '')}>
									<FileIcon className="mb-1" />
								</span>
								<span className="mt-2 ml-2">Foto auswählen</span>
							</label>
						)
					})()}
					<input
						type="file"
						accept="image/*"
						className="form-control-file mb-1"
						aria-label="file input"
						name="photoData"
						id="photoData"
						ref={fileRef}
						style={{ display: 'none' }}
					/>

					{(() => {
						if (pickGPS.lat) return (<>
							<label htmlFor="GPSgroup" className="text-center w-100 subtitle">
								GPS-Quelle
							</label>
							<div id="GPSgroup" className="btn-group w-100 mt-1 mb-2" role="group" aria-label="Pick the GPS source">
								<button type="button" className="btn btn-sm btn-primary" onClick={e => { setPickGPS({}) }}><NameIcon className="mb-1" /> Position</button>
								<button type="button" className="btn btn-sm btn-secondary" onClick={e => { photoGPS(pickGPS) }}><CameraIcon className="mb-1 mr-1" />Foto&shy;daten</button>
							</div>
						</>)
					})()}

					<button type="submit" className={"btn btn-dark btn-sm mt-2 w-100" + ((isSending || pickGPS.lat) ? ' disabled' : '')}>{isSending ? <span className="spinner-border spinner-border-sm text-white mr-2" role="status" aria-hidden="true" /> : null}Senden{isSending ? '…' : null}</button>
				</form>

			</div>
		</section>
	)

}

export default InputBox