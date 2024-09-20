import GoogleMapReact from 'google-map-react';
import p from "./pointer.png"
import { useContext, useEffect } from 'react';
import { Context } from '../../context';
import { Box, Button } from '@chakra-ui/react';
function SimpleMap() {
  const {mapData, setMapData} = useContext(Context);
  const defaultProps = {
    center: {
      lat: mapData[0]?.latitude=="Unknown"?19.0760:mapData[0]?.latitude,
      lng: mapData[0]?.longitude=="Unknown"?72.877426:mapData[0]?.longitude
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

  useEffect(()=>{
    let map;

    function initMap() {
      const mapOptions = {
          zoom: 7,
          center: {
            lat: Number(mapData[0]?.latitude || 0),
            lng: Number(mapData[0]?.longitude || 0)
        },
      };
  
      let alias = document.getElementById("map").getAttribute("al");
  
      const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
      
      mapData.forEach((data) => {
          if (data.latitude !== "Unknown" && data.longitude !== "Unknown") {
              const marker = new window.google.maps.Marker({
                  position: {
                      lat: Number(data.latitude),
                      lng: Number(data.longitude)
                  },
                  map: map,
                  icon: {
                      url: p, // Provide the correct path to your pointer.png
                      scaledSize: new window.google.maps.Size(20, 30)
                  },
                  
              });
  
              const infowindow = new window.google.maps.InfoWindow({
                  content: "<p> Count: " + data.count +" </p>",
              });
  
              marker.addListener("click", () => {
                  infowindow.open(map, marker);
              });
          }
      });
  }
  
      initMap()


  },[])
  return (
    <div id='map' style={{ height: '100vh', width: '100%', display:"flex", flexDirection:"column" }}>
      
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBiLWEqbEv65Bjtyy9BZ2C09aMratx6Juc" }}
        defaultCenter={defaultProps.center}
        yesIWantToUseGoogleMapApiInternals
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
