

export function RoutingMachineBtn({ setShowRouting, setNotice }){
    
    const handleShowRouting = () => {
        setShowRouting(true)
        setNotice({content: "Escribe un lugar de origen y uno de destino. Presiona enter", type: "info", show: true})
    }

    return(
        <button
            type="button"
            className="absolute top-24 right-4 z-[9999] rounded-md bg-main-green px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black"
            onClick = { handleShowRouting }
        >
        ¿A dónde vas?
        </button>
    )
}