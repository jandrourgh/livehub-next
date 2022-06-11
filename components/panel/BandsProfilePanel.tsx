import { IBand } from "interfaces/Band"
import { useCallback, useEffect, useState } from "react"
import BandForm from "./BandForm"
import PictureForm from "./PictureForm"
import React from "react"
import {Modal} from "react-bootstrap"
import SongForm from "./SongForm"

interface IBandsProfilePanelProps {
    bands: IBand[]
    token: string
    updateBand: (band: IBand) => void
    logOut: ()=>void
}
const BandsProfilePanel = ({bands, token, updateBand}: IBandsProfilePanelProps) => {
    const [selectedBand, setSelectedBand] = useState<null | Partial<IBand>>(null)
    const [editing, setEditing] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleEditBandClick = useCallback((band: IBand)=>{
        setSelectedBand(band)
        setEditing(true)
        setShowModal(true)
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
        setShowModal(true)
    }, [])

    const updateBandFromForm = (band: IBand) => {
        console.log(band, "en el componente padre")
        updateBand(band)
    }

    // useEffect(()=>{
    //     console.log(bands.length, "DENTRO DE BANDSPROFILEPANEL")
    // }, [bands])

    return (<section className="col-4">
        <div className="d-flex justify-content-between">
            <h2>My Bands</h2>
            <button className="btn btn-dark" onClick={handleNewBandClick}>Add Band</button>
        </div>
        <>
            {!bands.length?
                <article>
                    <h3>There are no bands here</h3>
                </article>
            :<>
                {bands.map((band, i)=>
                    <article key={i} className="d-flex justify-content-between  border-bottom p-3">
                        <p>{band.name}</p>
                        <button className="btn btn-dark" onClick={()=>{handleEditBandClick(band)}}>Edit</button>
                    </article>
                )}
            </>}
            <Modal show={showModal}>
                <BandForm band={selectedBand} token={token} editing={editing} updateBand={updateBandFromForm} closeModal={(evt)=>{
                    evt.preventDefault()
                    setShowModal(false)}}/>
                <PictureForm band={selectedBand} token={token} editing={editing}/>
                <SongForm band={selectedBand} token={token} editing={editing}/>
            </Modal>
        </>

        
    </section>)
}
export default BandsProfilePanel