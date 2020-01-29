import L from "leaflet"
import { } from "mapbox-gl-leaflet"
import PropTypes from "prop-types"
import { GridLayer, withLeaflet } from "react-leaflet"

class GLLayerBox extends GridLayer {
	createLeafletElement(props) {
		return L.mapboxGL(props)
	}
}

/*
* Props are the options supported by Mapbox Map object
* Find options here:https://www.mapbox.com/mapbox-gl-js/api/#new-mapboxgl-map-options-
*/
GLLayerBox.propTypes = {
	accessToken: PropTypes.string.isRequired,
	attribution: PropTypes.string
}

GLLayerBox.defaultProps = {
	style: 'mapbox://styles/ifoundone/ck5y0ubst3ift1ilouqadsyec',
	accessToken: 'pk.eyJ1IjoiaWZvdW5kb25lIiwiYSI6ImNrNXkwM2RvbjAwZ2oza29mbWt5NTZzZDcifQ.cUZALi58JclCJ_NY0tb80g'
}

export default withLeaflet(GLLayerBox) 