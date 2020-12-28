/* eslint-disable camelcase */

const env = {
	PORT: process.env.IFO_PORT,
	REACT_APP_IFO_AUTH_TIME: process.env.IFO_AUTH_TIME,
	REACT_APP_IFO_API: process.env.IFO_REST_URL,
	REACT_APP_IFO_URL: process.env.IFO_PUBLIC_URL,
	REACT_APP_IFO_MEDIA: process.env.IFO_MEDIA_URL,
}

const env_development = { ...env }
const env_production = {
	...env,
	BROWSER: 'NONE',
	// HTTPS: true,
	// SSL_CRT_FILE: '/etc/letsencrypt/live/ifound.one/cert.pem',
	// SSL_KEY_FILE: '/etc/letsencrypt/live/ifound.one/privkey.pem',
}

module.exports = {
	apps: [{
		name: 'ifound-maps',
		script: 'yarn',
		args: 'start',
		interpreter: '/bin/bash',
		env,
		env_development,
		env_production,
	}],
}
