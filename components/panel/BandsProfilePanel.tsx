import { IBand } from "interfaces/Band"
import { useCallback, useEffect, useState } from "react"
import BandForm from "./BandForm"
import PictureForm from "./PictureForm"

interface IBandsProfilePanelProps {
    bands: IBand[]
    token: string
    updateBand: (band: IBand) => void
    logOut: ()=>void
}
const BandsProfilePanel = ({bands, token, updateBand, logOut}: IBandsProfilePanelProps) => {
    const [selectedBand, setSelectedBand] = useState<null | Partial<IBand>>(null)
    const [editing, setEditing] = useState(false)

    const handleEditBandClick = useCallback((band: IBand)=>{
        setSelectedBand(band)
        setEditing(true)
    }, [])
    const handleNewBandClick = useCallback(()=>{
        setSelectedBand({
            description:"",
            genres: [],
            name: "",
            theme: {
                backdrop: false,
                borders: false,
                opacity: 1,
                primary: "#FFF",
                rounded: false,
                secondary: "#000"
            }
        })
        setEditing(false)
    }, [])

    const updateBandFromForm = (band: IBand) => {
        console.log(band, "en el componente padre")
        updateBand(band)
    }
    const handleLogOut = useCallback(()=>{
        logOut()
    }, [logOut])

    useEffect(()=>{
        console.log(bands.length, "DENTRO DE BANDSPROFILEPANEL")
    }, [bands])
    return (<section>
        <button onClick={handleLogOut}>Log Out</button>
        <h2>My Bands</h2>
        <button onClick={handleNewBandClick}>Add Band</button>
        <>
            {!bands.length?
                <article>
                    <h3>There are no bands here</h3>
                </article>
            :<>
                {bands.map((band, i)=>
                    <article key={i}>
                        <div><p>{band.name}</p></div>
                        <div><button onClick={()=>{handleEditBandClick(band)}}>Edit</button></div>
                    </article>
                )}
            </>}
            <BandForm band={selectedBand} token={token} editing={editing} updateBand={updateBandFromForm}/>
            <PictureForm band={selectedBand} token={token} editing={editing}/>
        </>

        
    </section>)
}
export default BandsProfilePanel