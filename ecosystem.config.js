module.exports = {
	apps: [{
		name: 'ifound-maps',
		script: 'npx',
		args: `serve -s build -l ${process.env.IFO_PORT}`,
		watch: 'build',
	}],
}
