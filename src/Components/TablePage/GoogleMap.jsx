import GoogleMapReact from 'google-map-react';
import p from "./pointer.png"
import { useContext } from 'react';
import { Context } from '../../context';
function SimpleMap() {
  const {mapData, setMapData} = useContext(Context);
  console.log(mapData)
  const defaultProps = {
    center: {
      lat: mapData[0].latitude=="Unknown"?19.0760:mapData[0].latitude,
      lng: mapData[0].longitude=="Unknown"?72.877426:mapData[0].longitude
    },
    zoom: 11
  };
  const mapOptions = {
    mapTypeControl: true,

    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
    },
    mapTypeId: 'satellite',
  };
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBiLWEqbEv65Bjtyy9BZ2C09aMratx6Juc" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions}
      >
        {mapData.map(i => {
          console.log(i)
          return (
            <Marker
              lat={i.latitude=="Unknown"?19.0760:i.latitude }
              lng={i.longitude=="Unknown"?72.877426:i.longitude}
              text=""
            />
          )
        })}

      </GoogleMapReact>
    </div>
  );
}


const Marker = () => (
  <div style={{
    position: 'absolute',
    transform: 'translate(-50%, -100%)'
  }}>
    <img style={{ height: "50px" }} src={p} alt="Marker" />
  </div>
);
export default SimpleMap;
