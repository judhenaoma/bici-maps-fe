import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet'
import L from 'leaflet';
import axios from 'axios';
import { LocationMarker } from './LocationMarker';
import { MapEvents } from './MapEvents';
import { Review } from '../Review/Review';
import { Notice } from "../Notice/Notice";
import { StationPopup } from './StationPopup';
import { RoutingMachine } from './RoutingMachine';
import { mapTiles } from './mapTiles';
import { WeatherMap } from './WeatherMap';
import { Wrapper } from '../Sidebar/Wrapper';
import locationLogo from '../../assets/unnamed.png';
import reviewMarker from '../../assets/comment-dots-solid.svg'
import parkingMarker from '../../assets/bicycle-parking.png';
import { RoutingMachineBtn } from './RoutingMachineBtn';
import '../../App.css';

function Map( { appRef } ) {
    // Encicla Stations  
    const [ stations, setStations ] = useState([]);
    const [ stationsLoaded , setStationsLoaded ] = useState(false);
    const [ showEstations, setShowStations ]  = useState(true)
    // Bike wayss
    const [ bikeWays, setBikeWays ] = useState([]);
    const [ bikewaysLoaded, setBikewaysLoaded ] = useState(false);
    const [ clickedBikeWay , setClickedBikeWay ] = useState(null)  
    const [ showBikeways, setShowBikeWays ] = useState(false)
    // Reviews
    const [ reviewMode, setReviewMode ] = useState(false)
    const [ reviewCoords, setReviewCoords ] = useState(null)
    const [ reviews, setReviews] = useState([])
    const [ reviewsLoaded, setReviewsLoaded ] = useState( false )
    const [ showReviews, setShowReviews ] = useState( false )
    // Reviews - show notice box when a review is created
    const [ showNotice, setNotice ] = useState( {show : false, content : '', type : ''} )
    // User ubication
    const [ userPosition, setUserPosition ] = useState( null )
    // Handler user scale to show things 
    const [nearScale, setNearScale] = useState( false )
    // MapTile showed on map
    const [ mapTile, setMapTile ] = useState("default")
    // Bike parking
    const [ parking, setParking ] = useState([]);
    const [ parkingLoaded , setParkingLoaded ] = useState(false);
    const [ showParking, setShowParking ]  = useState(false)
    const [showRouting, setShowRouting] = useState(false)

    
    useEffect(()=>{

      ( async () => {
        try{
          const { data } = await axios.get('https://webapp.metropol.gov.co/wsencicla/api/Disponibilidad/GetDisponibilidadMapas/')
          setStations(data);
          setStationsLoaded(true);
        }
        catch (error){
          console.log(error)
        }
      })();

      ( async () => {
        try{

          const response = await axios.get('https://bicimaps.herokuapp.com/api/bikeways/')
          if(response.status === 200){
            setBikeWays(response.data)
            setBikewaysLoaded(true)
          }
        }
        catch(error){
          console.log(error)
        }
      })();

      (async () => {
        try{

          const response = await axios.get('https://bicimaps.herokuapp.com/api/reviews/')
          if(response.status === 200){
            setReviews( response.data )
            setReviewsLoaded( true )
          }
        }
        catch(error){
          console.log(error)
        }
      })();

      ( async () => {
        try{

          const response = await axios.get('https://bicimaps.herokuapp.com/api/bike-parking-list/')
          if(response.status === 200){
            setParking(response.data)
            setParkingLoaded(true)
          }
        }
        catch(error){
          console.log(error)
        }
      })();
    }, [])
    
    // Effect to handler the cursor icon when is review mode on
    useEffect( () => {
      const mapContainer = document.querySelector('div.leaflet-container')
      reviewMode ? 
        mapContainer.style.cursor = 'crosshair' : 
        mapContainer.style.cursor = 'grab'
      
      reviewMode && 
        setNotice( (prev) => {
            return {...prev, show:true, content:"Selecciona el lugar donde quieres hacer la reseña", type:'info'}
        } )
    }, [ reviewMode ] )

    // Style settings of the map
    const stationsIcon = new L.Icon({
      iconUrl: locationLogo,
      iconSize: [25, 25]
    });

    const parkingIcon = new L.Icon({
      iconUrl : parkingMarker,
      iconSize : [30, 30]
    })

    const stationsLabelSetter = (name, percentage) => {

      let colorClass = '';
      switch(true){
        case percentage <= 10: 
          colorClass = 'lowBikes'
          break;
        case percentage <= 50: 
          colorClass = 'mediumBikes'
          break;
        default: 
          colorClass = 'enoughBikes'
      }

      const stationsLabel = new L.divIcon({
        className : `stations_labels ${colorClass}`,
        html : `<span>${name}</span>`
      })
      return stationsLabel
    }
    

    const reviewIcon = new L.Icon({
      iconUrl : reviewMarker,
      iconSize : [20, 20]
    })

    const defaultStyle = {
      color: "blue",
      weight: 4,
      opacity: 0.6,
    };
    const clickedStyle = {
      color: "red",
      weight: 7,
      opacity: 1,
    };

    // Handlers
  
    return (
      <>
        <MapContainer
            center = { [6.259770689579672, -75.57469561881551] } 
            zoom = { 14 } 
            scrollWheelZoom = { true }
            zoomControl = { false }
        >
          <MapEvents reviewMode = { reviewMode } 
                     setReviewCoords = { setReviewCoords }
                     setUserPosition = { setUserPosition }
                     setNearScale = { setNearScale }
                     nearScale = { nearScale } 
          />

          <TileLayer
             attribution={mapTiles[mapTile].attribution}
             url= {mapTiles[mapTile].url}
          />

          <ZoomControl position='topright'/>


          {/* Routing Machine component */}

          { showRouting ?
            <RoutingMachine userPosition={userPosition} /> :
            <RoutingMachineBtn 
              setShowRouting = {setShowRouting}
              setNotice = {setNotice}
            /> 
          }

          { showRouting && 
            (<Notice 
              content={showNotice.content} 
              type={showNotice.type}
              showHandler = {setNotice} 
            />)
          }
      

          <WeatherMap/>

          {/* Show notice box to give info about user interactions */}
          { showNotice.show && 
              (<Notice content={showNotice.content} 
                type={showNotice.type}
                showHandler = {setNotice} 
              />) 
            }
          {/* Show position of the user in the map */}
          {
            userPosition ? 
            <LocationMarker userPosition = { userPosition } /> : 
            null
          }
          {
            stationsLoaded && 
            showEstations ? (
              stations.map( (station) => {
                const bikesPercentage = (station.bikes / station.capacity) * 100;
                return (
                  <Marker key={station.id} 
                  position={[station.lat, station.lon]} 
                            icon={ nearScale ? stationsLabelSetter(station.name, bikesPercentage) : stationsIcon }>
                      <Popup
                        className="custom-popup"
                      >
                        <StationPopup station = { station }
                                      bikesPercentage = { bikesPercentage}
                                      appRef = {appRef}
                                      />
                      </Popup>
                    </Marker>
                  )
                })): 
            null
          }

          {
            bikewaysLoaded && showBikeways ? (
              bikeWays.map( ( bikeway ) => (
                <Polyline key={bikeway.way_id} 
                positions={ bikeway.bike_way.coordinates } 
                pathOptions={
                  !clickedBikeWay || clickedBikeWay !== bikeway.way_id ?
                  defaultStyle :
                  clickedStyle 
                }
                eventHandlers={{
                  click: function(e) {
                    setClickedBikeWay(bikeway.way_id)
                    e.target.bindPopup(
                      `<div><h2>${bikeway.name}</h2><p>Longitud: ${Math.floor(parseInt(bikeway.lenght))} m.</p></div>`
                      , { autoPan: false }).openPopup()
                    }
                  }}    
                  />
                  ))
                  ) : null
                }
          {
            reviewsLoaded && showReviews ? 
            reviews.map( (review) => (
              <Marker key={review.review_id} 
              position={review.review_location.coordinates}
              icon={reviewIcon}
              >
                  <Popup>
                    <p> <i>{review.review}</i></p>
                    <hr />
                    <span>Por: {review.user_id}</span>
                    <br />
                    <span>{review.created_at}</span>
                  </Popup>

                </Marker >
            ) ) : null
          }

          {
            parkingLoaded && 
            showParking ? (
              parking.features.map((parking) => {
                return (
                  <Marker
                  position={[parking.geometry.coordinates[1],parking.geometry.coordinates[0]]}
                  icon={parkingIcon}>
                    </Marker>
                  )
                })):
                null
              }


          {
            reviewCoords && 
            <Marker position={[reviewCoords?.map.lat, reviewCoords?.map.lng]}>
                <Review coordinates = { reviewCoords }
                        setReviewMode = { setReviewMode }
                        setReviewCoords = { setReviewCoords }
                        setReviews = { setReviews }
                        setReviewCreated = { setNotice } 
                        /> 
              </Marker>
          }

          <Wrapper
            showEstations = {showEstations}
            showBikeways = {showBikeways}
            showReviews = {showReviews}
            showParking = {showParking}
            setShowStations = {setShowStations}
            setShowBikeWays = {setShowBikeWays}
            setShowReviews = {setShowReviews}
            setShowParking = {setShowParking}
            reviewMode = { reviewMode }
            setReviewMode = { setReviewMode }
            userPosition = { userPosition }
            setUserPosition = { setUserPosition }
          />
        </MapContainer>
      </>
    )
  }
  
  export { Map }