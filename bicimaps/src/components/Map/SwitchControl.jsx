import { useState } from "react";
import '../../App.css';

function SwithControl({name, show, onToggle}){

    const toggleSwitch = () => {
        onToggle( (prev) => !prev )
    } 

    return(
        <div className="switch_control flex flex-row justify-evenly">
            <span className="text-white">{name}</span>
            <label className="switch">
                <input checked={show} onChange={toggleSwitch} type="checkbox"/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export { SwithControl };