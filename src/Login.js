import React, { useRef, useState, useContext, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import AuthContext from './context/AuthContext'

const LoginPage = (props) => {

	const formRef = useRef(null)
	const auth = useContext(AuthContext)
	const [alertMsg, setAlertMsg] = useState({
		alert: 0,
		message: ''
	})
	let removeTimer
	const [gotoMap, setGotoMap] = useState(<React.Fragment />)

	const alert = () => {
		const colour = (!alertMsg.alert)
			? 'alert-success'
			: 'alert-warning'
		if (!alertMsg.message || alertMsg.message === '')
			return ''
		else
			return (
				<div className={"alert " + colour + " alert-dismissible animated fadeIn fast"} role="alert">
					{alertMsg.message}
					<button type="button" className="close" data-dismiss="alert" aria-label="Close" onMouseUp={(e) => { clearTimeout(removeTimer) }}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const email = e.target.email.value
		const password = e.target.password.value
		fetch('https://ifound-rest.herokuapp.com/api/users/login', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			})
		})
			.then(res => { return res.json() })
			.then(response => {
				console.log(response)
				if (response.token && response.token !== '') {
					console.log('Logged in', response.message)
					setAlertMsg({
						alert: 0,
						message: 'Erfolgreich eingeloggt!'
					})
					auth.set(response.token)
					formRef.current.email.value = ''
					formRef.current.password.value = ''
					removeTimer = setTimeout(() => { setAlertMsg({ alert: 0, message: '' }) }, 6000)
					setTimeout(() => { setGotoMap(<Redirect to="/" />) }, 1800)
				} else {
					console.log('Login failed', response.message)
					setAlertMsg({
						alert: 1,
						message: response.message
					})
					formRef.current.email.value = ''
					formRef.current.password.value = ''
					removeTimer = setTimeout(() => { setAlertMsg({ alert: 0, message: '' }) }, 6000)
				}
				return response
			})
			.catch(err => {
				setAlertMsg({
					alert: 1,
					//message: 'Login fehlgeschlagen'
					message: err.message
				})
				formRef.current.email.value = ''
				formRef.current.password.value = ''
				removeTimer = setTimeout(() => { setAlertMsg({ alert: 0, message: '' }) }, 6000)
			})
	}

	useEffect(() => {
		setTimeout(() => {
			clearTimeout(removeTimer)
		}, 100)
	})


	return (
		<>
			<div className="col-md-4 offset-md-4 mt-4 b-4">
				{alert()}
				<form ref={formRef} key="login-form" className="form-signin" onSubmit={handleSubmit}>
					<h1 className="h3 mb-3 font-weight-normal">Hi, Pete!</h1>
					<label htmlFor="inputEmail" className="sr-only">E-Mail</label>
					<input type="email" name="email" id="inputEmail" className="form-control" placeholder="E-Mail" required autoFocus />
					<label htmlFor="inputPassword" className="sr-only">Passwort</label>
					<input type="password" name="password" id="inputPassword" className="form-control" placeholder="Passwort" required />
					<div className="checkbox mb-3">
						<label>
							<input type="checkbox" value="remember-me" /> Remember me
								</label>
					</div>
					<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
					<p className="mt-5 mb-3 text-muted">© 2020</p>
				</form>
			</div>
			{gotoMap}
		</>
	)

}

export default LoginPage