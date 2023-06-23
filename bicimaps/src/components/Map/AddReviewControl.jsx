import { useState } from "react"

function AddReviewControl( { reviewMode, setReviewMode } ){

    const toggleReviewMode = () => {
        setReviewMode(!reviewMode)
      }

    return(
        
        <button className="ml-3 rounded-lg p-1 text-white hover:bg-main-green hover:text-black" disabled = { reviewMode ? true : false } 
                onClick = { toggleReviewMode } >
            Agrega una reseña 
        </button>
    )
}   

export { AddReviewControl }
