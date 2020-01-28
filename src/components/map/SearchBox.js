import React from 'react'
import { MapControl, withLeaflet } from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

class Search extends MapControl {
	createLeafletElement() {
		return new GeoSearchControl({
			provider: new OpenStreetMapProvider(),
			style: 'bar',
		})
	}
}

export default withLeaflet(Search)