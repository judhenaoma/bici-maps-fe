import { useMap, useMapEvents} from 'react-leaflet'

function MapEvents({reviewMode, setReviewCoords, setUserPosition, setNearScale, nearScale}){

    const mapInstance = useMap()
    const mapEvents = useMapEvents({
        locationfound : (e) => {
            setUserPosition(e.latlng)
            mapInstance.flyTo(e.latlng, 16)
          },
          
        click : (e) =>{
            if(reviewMode){
                if (e.originalEvent.target.tagName !== 'TEXTAREA' && 
                    e.originalEvent.target.tagName !== 'BUTTON'){ 
                    const coords = e.latlng
                    const centerCoords= mapInstance.getCenter()
                    const boxCoords = mapEvents.latLngToContainerPoint([centerCoords.lat, centerCoords.lng])
                    setReviewCoords({map : coords, box: boxCoords})
                    mapInstance.setView(coords)    
                }
            }
        },
        zoomend : () => {
            if(mapEvents.getZoom() >= 15){
                !nearScale && setNearScale( true )
            }
            else if( mapEvents.getZoom() < 15) {
                nearScale && setNearScale( false )

            }
        }
    })
    return null
}

export { MapEvents }


