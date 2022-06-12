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
  image: FileList
}

const PictureForm = ({ band, token }: IPictureFormProps) => {

    const [image, setImage] = useState<string|undefined>(band?.imgUrl)
    const [hasChanged, setHasChanged] = useState(false)
    const onSubmit = async (values: IValues) =>{
      // console.log("submit")
        // console.log(values.image[0]) 
        const dataSend= new FormData()
        if(band){
          // console.log(band, band.id)
          dataSend.append("band", band.id?band.id:"")
        }
        dataSend.append("image", values.image[0] )
        const response = await fetch("api/bands/changePicture", {
            body: dataSend,
            headers: {"authorization": `Bearer ${token}`}, 
            method: "POST",
        })
        // console.log(response)
    }
    const validate = (values: IValues) => {
      if(values.image?.length){
        const file = values.image[0]
        // console.log(file)
        const reader = new FileReader()
        const url = reader.readAsDataURL(file)
        reader.onloadend = (e) => {
          // console.log(reader.result?.toString())
          if(reader.result){
            setHasChanged(true)
            setImage(reader.result?.toString())
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
              <h3>Band image</h3>
                <div>
                    <div className="container">
                      <div className="d-flex justify-content-evenly">
                        <label htmlFor="image" className="btn btn-dark">Choose an image</label>
                        {
                          values.image?.length?<button className="btn btn-success" type="submit">Set this Image</button>:""
                        }
                      </div>
                      <div className="d-flex p-4" >
                        <div>
                          {
                            image===undefined?"":<img src={`${image}`} className="img-thumbnail" alt="" />
                          }
                        </div>
                      </div>
                    </div>
                    <FileField id="image" hidden name="image"></FileField>
                </div>
                <div className="p-2">
                </div>
                
            </form>
        </div>
      )}
    />
  );
};
export default PictureForm;
