/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
	useRef, useState, useContext, useEffect,
} from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import AuthContext from '../context/AuthContext'

const cookies = new Cookies()

const LoginPage = () => {
	const formRef = useRef(null)
	const { setToken } = useContext(AuthContext)
	const [alertMsg, setAlertMsg] = useState({
		alert: 0,
		message: '',
	})
	const [gotoMap, setGotoMap] = useState(<></>)

	const Alert = (props) => {
		const colour = (!alertMsg.alert)
			// ? 'alert-success'
			? 'alert-info'
			: 'alert-danger'
		if (!alertMsg.message || alertMsg.message === '')
			return ''
		return (
			<div className={`alert ${colour} alert-dismissible animated fadeIn fast ${props.className}`} role="alert">
				{alertMsg.message}
				<button
					type="button"
					className="close"
					data-dismiss="alert"
					aria-label="Close"
					onMouseUp={() => {
						setAlertMsg({
							alert: 0,
							message: '',
						})
					}}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const email = e.target.email.value.toLowerCase()
		const password = e.target.password.value
		fetch(`${process.env.REACT_APP_IFO_API}/users/login`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response)
				if (response.token && response.token !== '') {
					console.log('Logged in', response.message, response)
					setAlertMsg({
						alert: 0,
						message: 'Erfolgreich eingeloggt!',
					})
					setToken(response.token)
					if (formRef.current.rememberMe.checked)
						cookies.set('token', response.token, {
						// httpOnly: true,
						// domain: '.herokuapp.com',
							maxAge: process.env.REACT_APP_IFO_AUTH_TIME,
						})
					formRef.current.email.value = ''
					formRef.current.password.value = ''
					setTimeout(() => { setGotoMap(<Redirect to="/" />) }, 1800)
				} else {
					console.log('Login failed', response.message)
					setAlertMsg({
						alert: 1,
						message: response.message,
					})
					formRef.current.email.value = ''
					formRef.current.password.value = ''
				}
				return response
			})
			.catch((err) => {
				setAlertMsg({
					alert: 1,
					message: err.message,
				})
				formRef.current.email.value = ''
				formRef.current.password.value = ''
			})
	}

	useEffect(() => {
		const clearTimer = setTimeout(() => { setAlertMsg({ alert: 0, message: '' }) }, 6000)
		return () => clearTimeout(clearTimer)
	}, [alertMsg])


	return (
		<>
			<div className="col-md-4 offset-md-4 mt-4 mb-4 w-100 h-100">
				<Alert className="mb-1" />
				<form ref={formRef} key="login-form" className="form-signin pt-4" onSubmit={handleSubmit}>
					<h1 className="h3 mt-5 mb-3 font-weight-normal">Hi, Pete!</h1>
					<label htmlFor="email" className="sr-only">E-Mail</label>
					<input
						type="email"
						name="email"
						id="inputEmail"
						className="form-control mb-3"
						placeholder="E-Mail"
						required
						autoFocus
					/>
					<label htmlFor="password" className="sr-only">Passwort</label>
					<input
						type="password"
						name="password"
						id="inputPassword"
						className="form-control mb-3"
						placeholder="Passwort"
						required
					/>
					<div className="checkbox mb-3">
						<label>
							<input type="checkbox" name="rememberMe" value="true" defaultChecked />
							{' '}
							Eingeloggt bleiben
						</label>
					</div>
					<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
					<p className="mt-4 text-flip">© 2020</p>
				</form>
			</div>
			{gotoMap}
		</>
	)
}

export default LoginPage
