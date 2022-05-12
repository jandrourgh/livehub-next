import { IPanelData } from "interfaces/Panel"
import { useEffect } from "react"
import BandsProfilePanel from "./panel/BandsProfilePanel"

interface IPanelDataProps {
    panelData: IPanelData
}

const PanelLayout = ({panelData}: IPanelDataProps) => {
    useEffect(()=>{
        console.log(panelData)
    },[panelData])
    return (
        <>
            PANEL LAYOUT
            {panelData.bands?<BandsProfilePanel bands={panelData.bands}/>: <></>}
        </>
    )
}
export default PanelLayout