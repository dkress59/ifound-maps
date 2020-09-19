module.exports = {
  apps : [{
		name: 'ifound-maps',
		script: 'npm',
		args: 'run start',
		watch: '.',
		env_production: {
			BROWSER: 'NONE',
			PORT: process.env.IFO_PORT,
		},
	}]
}
