import './InputBox.css'
import React, { useState, useRef, useContext, useEffect } from 'react'
import MapContext from '../../context/MapContext'
import ReactDOM from 'react-dom'


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

const InputBox = (props) => {
	//const [coords, setCoords] = useState({ lat: 51.2432, lng: 6.7822 })
	const fileRef = useRef(null)
	const context = useContext(MapContext)

	const handleSubmit = (e) => {
		e.preventDefault()
		const formBody = new FormData()
		formBody.append('name', e.target.name.value)
		formBody.append('author', e.target.author.value)
		formBody.append('lat', context.coords.lat)
		formBody.append('lng', context.coords.lng)
		formBody.append('photoData', fileRef.current.files[0])
		fetch('https://ifound-rest.herokuapp.com/api/places', {
			//fetch('http://localhost:5000/api/places', {//dev
			method: 'post',
			body: formBody
		})
			.then(res => { return res.json() })
			.then(res => {
				console.log(res)
				props.setPlaces([...props.places, res.newPlace])
			})
	}

	// !! maybe move this to jquery later !!
	const [boxSize, setBoxSize] = useState({w:0,h:0})
	const bodyRef = useRef(null)
	const [isCollapsed, collapse] = useState(props.collapsed||false)
	const className = () => {
		const paren = props.className || ''
		const defaul = 'card shadow '
		const collaps = isCollapsed ? ' collapsed' : ''
		return defaul + paren + collaps
	}
	useEffect(() => {
		const w = ReactDOM.findDOMNode(bodyRef.current).clientWidth
		const h = ReactDOM.findDOMNode(bodyRef.current).clientHeight
		if (boxSize.w < w || boxSize.h < h) setBoxSize({w:w,h:h})
	}, [boxSize.w, boxSize.h])
	const setSize = () => {
		if (!isCollapsed && boxSize.h && boxSize.w)
			return { width: boxSize.w+'px', height: boxSize.h+'px' }
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
				<form onSubmit={handleSubmit} className="form-group">

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
							className="form-control "
							aria-label="Dein Name"
							placeholder="Name"
							aria-describedby="authorInputPrepend"
							name="author"
							id="author"
						/>
					</div>

					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text" id="nameInputPrepend">
								<NameIcon />
							</span>
						</div>
						<input
							required
							type="text"
							//placeholder="Fundstelle"
							className="form-control "
							aria-label="Dein Fundort"
							placeholder="Fundort"
							aria-describedby="nameInputPrepend"
							name="name"
							id="name"
						/>
					</div>

					<label htmlFor="photoData">
						<h6 className="card-subtitle m-0">Zeig' uns dein Foto!</h6>
					</label>
					<input
						type="file"
						className="form-control-file mb-3"
						aria-label="file input"
						name="photoData"
						id="photoData"
						ref={fileRef}
					/>

					<button type="submit" className="btn btn-dark btn-sm w-100">Senden</button>
				</form>

			</div>
		</section>
	)

}

export default InputBox