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
	style: "mapbox://styles/mapbox/outdoors-v11"
}

export default withLeaflet(GLLayerBox) 