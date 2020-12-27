const env = {
	PORT: process.env.PORT,
	REACT_APP_IFO_AUTH_TIME: process.env.REACT_APP_IFO_AUTH_TIME,
	REACT_APP_IFO_API: process.env.REACT_APP_IFO_API,
	REACT_APP_IFO_URL: process.env.REACT_APP_IFO_URL,
	REACT_APP_IFO_MEDIA: process.env.REACT_APP_IFO_MEDIA,

}

module.exports = {
	apps: [{
		name: 'ifound-maps',
		// watch: 'build',
		script: 'yarn',
		args: 'serve -s -l $PORT',
		interpreter: '/bin/bash',
		env_development: {
			...env,
		},
		env_production: {
			...env,
			HTTPS: true,
			BROWSER: 'NONE',
			SSL_CRT_FILE: '/etc/letsencrypt/live/ifound.one/cert.pem',
			SSL_KEY_FILE: '/etc/letsencrypt/live/ifound.one/privkey.pem',
		},
	}],
}
