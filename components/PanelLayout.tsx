import { IPanelData } from "interfaces/Panel"
import { useEffect } from "react"
import BandsProfilePanel from "./panel/BandsProfilePanel"

interface IPanelDataProps {
    panelData: IPanelData,
    token: string
}

const PanelLayout = ({panelData, token}: IPanelDataProps) => {
    useEffect(()=>{
        console.log(panelData)
    },[panelData])
    return (
        <>
            PANEL LAYOUT
            {panelData.bands?<BandsProfilePanel token={token} bands={panelData.bands}/>: <></>}
        </>
    )
}
export default PanelLayout