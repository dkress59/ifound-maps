import React from 'react'

const MapContext = React.createContext({
	coords: { lat:0, lng:0 },
	setCoords: () => {},
	places: [],
	setPlaces: () => {},
	range: 0,
	setRange: () => {} 
})

export default MapContext