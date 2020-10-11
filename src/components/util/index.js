/* eslint-disable no-console */
export const logToConsole = (...logs) => {
	if (process.env.NODE_ENV === 'development')
		console.log(...logs)
}

export const logErrorToConsole = (...logs) => {
	if (process.env.NODE_ENV === 'development')
		console.error(...logs)
}

export const logInfoToConsole = (...logs) => {
	if (process.env.NODE_ENV === 'development')
		console.info(...logs)
}

export const logWarningToConsole = (...logs) => {
	if (process.env.NODE_ENV === 'development')
		console.warn(...logs)
}

