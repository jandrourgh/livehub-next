import { IBand } from "interfaces/Band"
import { IPanelData } from "interfaces/Panel"
import { useEffect } from "react"
import BandsProfilePanel from "./panel/BandsProfilePanel"
import CustomerBookingsPanel from "./panel/CustomerBookingsPanel"
import EmployeeBookingsPanel from "./panel/EmployeeBookingsPanel"

interface IPanelDataProps {
    panelData: IPanelData,
    token: string,
    updateBand: (band: IBand) => void
    logOut: ()=>void
}

const PanelLayout = ({panelData, token, updateBand, logOut}: IPanelDataProps) => {

    const updateBandFromProfilePanel = (band: IBand) => {
        updateBand(band)
    }

    useEffect(()=>{
        console.log(panelData)

        switch(panelData.role){
            case "user":
                console.log("user")
                break;
            case "employee":
                console.log("employee")
                break;
            case "admin":
                console.log("admin")
                break;
        }
    },[panelData])


    return (
        <>
            PANEL LAYOUT
            <button onClick={logOut}>Log Out</button>
            {
                
            }
            {
                panelData.role=="user"?
                    <>
                        <BandsProfilePanel 
                            updateBand={updateBandFromProfilePanel}
                            token={token}
                            bands={panelData.bands}
                            logOut={logOut}/>
                        <CustomerBookingsPanel token={token} />
                    </>
                    :<></>
            }
            {
                panelData.role=="employee"?
                    <>
                        <EmployeeBookingsPanel token={token} roomInfo={panelData.roomData}/>
                    </>:<></>
            }
        </>
    )
}
export default PanelLayout