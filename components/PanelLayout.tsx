import { PanelData } from "interfaces/Panel"

const PanelLayout = ({bands, userData}: PanelData) => {
    console.log(bands, userData)
    return (
        <>
            PANEL LAYOUT
            {bands.map((band, i)=>{
                return <ul key={i}>
                    <li>{band.id}</li>
                    <li>{band.name}</li>
                    <li>{band.userId}</li>
                </ul>
            })}
        </>
    )
}
export default PanelLayout