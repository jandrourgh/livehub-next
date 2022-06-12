import { BandItemProps } from "../interfaces/BandItemProps"
import Image from 'next/image'
import Link from 'next/link'
import React from "react"

const BandItem = ({band}: BandItemProps) => {

    console.log(band)

    return <div className="col-12 col-md-6 col-xl-4">
            <article className="card">
                <div className="card-title text-center">
                    <h3>{band.name}</h3>
                </div>
                <ul className="d-flex justify-content-center p-0">
                    {band.genres.map((genre, i)=><li className="badge text-ligt bg-dark mx-2" key={i}>{genre}</li>)}
                </ul>
                <div className="">

                {
                    band.imgUrl?<img src={band.imgUrl} height="100px" className="img-thumbnail"></img>: ""
                }
                </div>
                <div className="card-footer">
                    <div className="row">
                        <Link href={`/bands/${band.id}`}><button className="btn btn-dark">Go to band page</button></Link> 
                    </div>
                </div>
                
            </article>
        </div>
}
export default BandItem