import React from 'react'
import { Helmet } from 'react-helmet'

export default () => {
	return (
		<Helmet>
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-title" content="ifound-one" />

			<link rel="icon" type="image/png" sizes="196x196" href={`${process.env.REACT_APP_IFO_URL}/favicon-196.png`} />
			<link rel="apple-touch-icon" sizes="180x180" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-icon-180.png`} />
			<link rel="apple-touch-icon" sizes="167x167" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-icon-167.png`} />
			<link rel="apple-touch-icon" sizes="152x152" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-icon-152.png`} />
			<link rel="apple-touch-icon" sizes="120x120" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-icon-120.png`} />


			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-2048-2732.png`}
				media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-2732-2048.png`}
				media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1668-2388.png`}
				media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-2388-1668.png`}
				media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1668-2224.png`}
				media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-2224-1668.png`}
				media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1536-2048.png`}
				media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-2048-1536.png`}
				media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1242-2688.png`}
				media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-2688-1242.png`}
				media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1125-2436.png`}
				media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-2436-1125.png`}
				media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-828-1792.png`}
				media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1792-828.png`}
				media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1242-2208.png`}
				media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-2208-1242.png`}
				media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-750-1334.png`}
				media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1334-750.png`}
				media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-640-1136.png`}
				media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-1136-640.png`}
				media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />

			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-2048-2732.png`}
				media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-2732-2048.png`}
				media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1668-2388.png`}
				media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-2388-1668.png`}
				media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1668-2224.png`}
				media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-2224-1668.png`}
				media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1536-2048.png`}
				media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-2048-1536.png`}
				media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1242-2688.png`}
				media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-2688-1242.png`}
				media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1125-2436.png`}
				media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-2436-1125.png`}
				media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-828-1792.png`}
				media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1792-828.png`}
				media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1242-2208.png`}
				media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-2208-1242.png`}
				media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-750-1334.png`}
				media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1334-750.png`}
				media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-640-1136.png`}
				media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
			<link rel="apple-touch-startup-image" href={`${process.env.REACT_APP_IFO_URL}/pwa/apple-splash-dark-1136-640.png`}
				media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
		</Helmet>
	)
}