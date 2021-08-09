import ReactMapGl,{Marker,Popup} from 'react-map-gl';
import {useState} from 'react';
import { getCenter } from 'geolib';

function Map({searchResults}) {

    const [selectedLocation,setSelectedLocation] = useState({});

// Transforming search results to {latitude:, longitude:} object
const coordinates=searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat,
}))

const center = getCenter(coordinates);
const [viewport, setViewport] = useState({
    width:'100%', 
    height:'100%',
    longitude:center.longitude,
    latitude:center.latitude,
    zoom:11,
});

    return (
        <ReactMapGl
        mapStyle='mapbox://styles/raxith/cks4xrjnu6m9018nnfkwjjf2v'
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        >
        {searchResults.map(result => (
            <div key={result.long}>
            <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
            >
            <a onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl
            animate-bounce" aria-label="push-pin">📌</a>
            </Marker>

            {/* Pop-up for the marker */}
            {selectedLocation.long === result.long ?(
                <Popup closeOnClick={true} 
                onClose={() => setSelectedLocation({})}
                latitude={result.lat}
                longitude={result.long}
                >
                {result.title}
            </Popup>):(false)}
            </div>
        ))}
        </ReactMapGl> 
    )
}

export default Map
