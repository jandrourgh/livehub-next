import { IBand } from "interfaces/Band"
import { IPanelData } from "interfaces/Panel"
import { useEffect } from "react"
import BandsProfilePanel from "./panel/BandsProfilePanel"

interface IPanelDataProps {
    panelData: IPanelData,
    token: string,
    updateBand: (band: IBand) => void
}

const PanelLayout = ({panelData, token, updateBand}: IPanelDataProps) => {

    const updateBandFromProfilePanel = (band: IBand) => {
        updateBand(band)
    }

    useEffect(()=>{
        console.log(panelData)
    },[panelData])
    return (
        <>
            PANEL LAYOUT
            {panelData.bands?<BandsProfilePanel updateBand={updateBandFromProfilePanel} token={token} bands={panelData.bands}/>: <></>}
        </>
    )
}
export default PanelLayout