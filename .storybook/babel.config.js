module.exports = {
	presets: [
		'@babel/preset-react',
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: '> 2%, edge >= 17',
				},
			},
		],
	],
	plugins: [
		'@babel/proposal-class-properties',
		'@babel/plugin-syntax-throw-expressions',
		'@babel/plugin-proposal-throw-expressions',
	],
}
