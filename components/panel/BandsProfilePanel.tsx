import { IBand } from "interfaces/Band"
import { useCallback, useEffect, useState } from "react"
import BandForm from "./BandForm"
import PictureForm from "./PictureForm"

interface IBandsProfilePanelProps {
    bands: IBand[]
    token: string
}
const BandsProfilePanel = ({bands, token}: IBandsProfilePanelProps) => {
    const [selectedBand, setSelectedBand] = useState<null | IBand>(null)

    const handleEditBandClick = useCallback((band: IBand)=>{
        setSelectedBand(band)
    }, [])

    useEffect(()=>{
        console.log(bands.length, "DENTRO DE BANDSPROFILEPANEL")
    }, [bands])
    return (<section>
        <h2>My Bands</h2>
        <button>Add Band</button>
        {
            !bands.length?
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
                <BandForm band={selectedBand}/>
                <PictureForm band={selectedBand} token={token}/>
            </>

        }
    </section>)
}
export default BandsProfilePanel