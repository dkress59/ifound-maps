import './InputBox.css'
import React, { useState, useRef, useContext, useEffect } from 'react'
import MapContext from '../../context/MapContext'
import ReactDOM from 'react-dom'
import { isMobile } from 'react-device-detect'
import './InputRange.css'


const UserIcon = props => {
	const addClass = props.className && ' ' + props.className
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			style={props.style}
			className={"feather feather-user" + addClass}
		>
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	)
}
const NameIcon = (props) => {
	const addClass = props.className && ' ' + props.className
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			style={props.style}
			className={"feather feather-map-pin" + addClass}
		>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	)
}
const MinimiseIcon = (props) => {
	const addClass = props.className && ' ' + props.className
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			style={props.style}
			className={"feather feather-minimize" + addClass}
		>
			<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
		</svg>
	)
}
const AddIcon = (props) => {
	const addClass = props.className && ' ' + props.className
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={"feather feather-plus" + addClass}
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	)
}
const CameraIcon = (props) => {
	const addClass = props.className && ' ' + props.className
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={"feather feather-camera" + addClass}
		>
			<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
			<circle cx="12" cy="13" r="4" />
		</svg>
	)
}
const FileIcon = (props) => {
	const addClass = props.className && ' ' + props.className
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={"feather feather-file" + addClass}
		>
			<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
			<polyline points="13 2 13 9 20 9" />
		</svg>
	)
}

const InputBox = (props) => {
	//const [coords, setCoords] = useState({ lat: 51.2432, lng: 6.7822 })
	const fileRef = useRef(null)
	const cameraRef = useRef(null)
	const context = useContext(MapContext)
	const [isSending, setIsSending] = useState(0)
	const formRef = useRef(null)
	const [pickGPS, setPickGPS] = useState(0)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (isSending) return false
		const formBody = new FormData()
		formBody.append('name', e.target.name.value)
		formBody.append('author', e.target.author.value)
		formBody.append('lat', context.coords.lat)
		formBody.append('lng', context.coords.lng)
		formBody.append('range', context.range)
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
				if (context.places) context.setPlaces([...context.places, res.newPlace])
				setIsSending(0)
				formRef.current.reset()
				context.setRange(0)
				if (res.newPlace.gps) setPickGPS(1)
			})
			.catch(err => {
				console.error(err)
				setIsSending(0)
			})
	}

	// !! maybe move this to jquery later !!
	const [boxSize, setBoxSize] = useState({ w: 0, h: 0 })
	const bodyRef = useRef(null)
	const [isCollapsed, collapse] = useState(props.collapsed || false)
	const className = () => {
		const paren = props.className || ''
		const defaul = 'card shadow '
		const collaps = isCollapsed ? ' collapsed' : ''
		return defaul + paren + collaps
	}
	useEffect(() => {
		const w = ReactDOM.findDOMNode(bodyRef.current).clientWidth
		const h = ReactDOM.findDOMNode(bodyRef.current).clientHeight
		if (boxSize.w < w || boxSize.h < h) setBoxSize({ w: w, h: h })
	}, [boxSize.w, boxSize.h])
	useEffect(() => {
		if (isMobile) collapse(true)
	}, [])

	const setSize = () => {
		if (!isCollapsed && boxSize.h && boxSize.w)
			return { width: boxSize.w + 'px', height: boxSize.h + 'px' }
	}

	return (
		<section
			id="mapInputBox"
			className={className()}
		>
			<div className="card-header text-right bg-primary text-white">
				<button
					onMouseDown={() => { collapse(!isCollapsed) }}
					className="btn btn-sm btn-outline-light text-white text-hover-primary"
				>
					{!isCollapsed && <MinimiseIcon />}
					{isCollapsed && <AddIcon />}
				</button>
			</div>

			<div ref={bodyRef} className="card-body" style={setSize()}>
				<form ref={formRef} onSubmit={handleSubmit} className="form-group">

					<input name="lat" type="hidden" value={context.coords.lat} />
					<input name="lng" type="hidden" value={context.coords.lng} />

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
							disabled={isSending || pickGPS}
							aria-label="Dein Name"
							placeholder="Name"
							aria-describedby="authorInputPrepend"
							title="name"
							name="author"
							id="author"
						/>
					</div>

					<div className="input-group mb-2">
						<div className="input-group-prepend">
							<span className="input-group-text" id="nameInputPrepend">
								<NameIcon />
							</span>
						</div>
						<input
							required
							type="text"
							//placeholder="Fundstelle"
							className={"form-control"}
							disabled={isSending || pickGPS}
							aria-label="Dein Fundort"
							placeholder="Fundort"
							aria-describedby="nameInputPrepend"
							title="place"
							name="name"
							id="name"
						/>
					</div>
					<label htmlFor="formControlRange" className="text-center w-100 subtitle">
						Umkreis{context.range > 0 ? ': '+context.range+'m' : null}
					</label>
					<input
						type="range"
						className={"form-control-range mb-2 mt-2"}
						disabled={isSending || pickGPS}
						id="formControlRange"
						initial="20"
						onChange={e => {context.setRange(e.target.value)}}
					/>

					{isMobile && <label htmlFor="cameraData" style={{ width: 'calc(50% - .125em)' }} className="mr-1">
						<span className={"btn btn-primary mt-2 pb-2 mb-1 w-100" + ((isSending || pickGPS) ? ' disabled' : '')}><CameraIcon /></span>
					</label>}
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
					{isMobile && (
						<label htmlFor="photoData" style={{ width: 'calc(50% - .125em)' }}>
							<span className={"btn btn-primary mt-2 mb-1 w-100" + ((isSending || pickGPS) ? ' disabled' : '')}><FileIcon /></span>
						</label>
					)}
					{!isMobile && (
						<label htmlFor="photoData" className="">
							<span className={"btn btn-primary mt-2 mb-1 mr-2" + ((isSending || pickGPS) ? ' disabled' : '')}><FileIcon /></span> Foto auswählen
						</label>
					)}
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

					{pickGPS ? (<>
						<label htmlFor="GPSgroup" className="text-center w-100 subtitle">
							GPS-Quelle
						</label>
						<div id="GPSgroup" class="btn-group w-100 mb-4" role="group" aria-label="Pick the GPS source">
							<button type="button" className="btn btn-sm btn-primary" onClick={e => setPickGPS(0)}><NameIcon className="mb-1" /> Position</button>
							<button type="button" className="btn btn-sm btn-secondary" onClick={e => setPickGPS(0)}><CameraIcon className="mb-1 mr-1" />Foto&shy;daten</button>
						</div>
					</>) : null}

					<button type="submit" className={"btn btn-dark btn-sm mt-2 w-100" + ((isSending || pickGPS) ? ' disabled' : '')}>{isSending ? <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true" /> : null}Senden{isSending ? '…' : null}</button>
				</form>

			</div>
		</section>
	)

}

export default InputBox