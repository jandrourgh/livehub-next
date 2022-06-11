import { IBand } from "interfaces/Band"
import { IPanelData } from "interfaces/Panel"
import { useEffect } from "react"
import BandsProfilePanel from "./panel/BandsProfilePanel"
import CustomerBookingsPanel from "./panel/CustomerBookingsPanel"
import EmployeeBookingsPanel from "./panel/EmployeeBookingsPanel"
import React from "react"

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
            <div className="row p-2 pt-0">
                <div className="col-12 d-flex justify-content-end">
                    <button onClick={logOut} className=" btn btn-light mx-4">Log Out</button>

                </div>

            </div>
            {
                panelData.role=="user"?
                    <div className="container p-3">
                        <div className="row">
                            <BandsProfilePanel 
                                updateBand={updateBandFromProfilePanel}
                                token={token}
                                bands={panelData.bands}
                                logOut={logOut}/>
                            <CustomerBookingsPanel token={token} userData={panelData.userData} />
                        </div>
                    </div>
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