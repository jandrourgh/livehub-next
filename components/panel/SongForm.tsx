import { IBand } from "interfaces/Band";
import FileField from "./FileField";
import { Form } from "react-final-form";
import React, {useEffect, useState} from "react"
import Image from 'next/image'

interface IPictureFormProps {
  band: Partial<IBand> | null;
  token: string,
  editing: boolean
}
interface IValues {
  song: FileList
}

const SongForm = ({ band, token }: IPictureFormProps) => {

    const [song, setSong] = useState<string|undefined>(band?.songUrl)
    const [songName, setSongName] = useState(band?.songName)
    const [hasChanged, setHasChanged] = useState(false)
    const onSubmit = async (values: IValues) =>{
      console.log("submit")
        console.log(values.song[0]) 
        const dataSend= new FormData()
        if(band){
          console.log(band, band.id)
          dataSend.append("band", band.id?band.id:"")
        }
        if(songName){
            dataSend.append("songname", songName)
        }
        dataSend.append("song", values.song[0] )
        const response = await fetch("api/bands/changeSong", {
            body: dataSend,
            headers: {"authorization": `Bearer ${token}`}, 
            method: "POST",
        })
        console.log(response)
    }
    const validate = (values: IValues) => {
      if(values.song?.length){
        const file = values.song[0]
        console.log(file)
        const reader = new FileReader()
        const url = reader.readAsDataURL(file)
        reader.onloadend = (e) => {
          //console.log(reader.result?.toString())
          if(reader.result){
            setHasChanged(true)
            setSongName(file.name.split(".")[0])
            setSong(reader.result?.toString())
          }
        }
      }
      return {} ;
    }
  return (
    <Form
      onSubmit={onSubmit}
      validate={ values => validate(values)}
      render={({ handleSubmit, values }) => (
        <div className="p-2">
          
            <form onSubmit={handleSubmit}>
              <h3>Band Song</h3>
                {band?.songName?<p>You have uploaded {band?.songName}</p>:""}
                <div>
                    <div className="container">
                      <div className="d-flex justify-content-evenly">
                        <label htmlFor="song" className="btn btn-dark">Choose a song</label>
                        {
                          values.song?.length?<button className="btn btn-success" type="submit">Upload {songName}</button>:""
                        }
                      </div>
                      <div className="d-flex p-4" >
                        
                      </div>
                    </div>
                    <FileField id="song" hidden name="song"></FileField>
                </div>
                <div className="p-2">

                </div>
                
            </form>
        </div>
      )}
    />
  );
};
export default SongForm;
