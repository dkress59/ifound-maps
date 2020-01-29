import React from 'react'
import { MapControl, withLeaflet } from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch'
import SearchControl from './SearchControl'
import L from 'leaflet'


const myIcon = L.Icon({
	iconUrl: 'test.png',
	iconSize: [50, 81],
	iconAnchor: [22, 94],
	//popupAnchor: [-3, -76],
	//shadowUrl: 'my-icon-shadow.png',
	//shadowSize: [68, 95],
	//shadowAnchor: [22, 94]
});
const M = new L.Marker(0,0, { icon: myIcon })

class Search extends MapControl {

	createLeafletElement() {
		return  new GeoSearchControl({
			provider: new OpenStreetMapProvider(),
			style: 'bar',
			//marker: M,
			marker: { icon: myIcon }

		})
	}
	
}

export default withLeaflet(Search)