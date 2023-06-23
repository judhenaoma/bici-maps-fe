import { useMap } from "react-leaflet"

function LocateUserControl( {userPosition, setUserPosition} ){

    const mapInstance = useMap()

    const handleUserPosition = (e) =>{
        console.log(userPosition)
        if(userPosition){
            mapInstance.flyTo(userPosition, 16)
           return; 
        }
        mapInstance.locate();
    }

    return(
        <button className="ml-3 text-white rounded-lg p-1 hover:bg-main-green hover:text-black" onClick={ handleUserPosition }> 
            Mi posición 
        </button>
    )
}
export { LocateUserControl }