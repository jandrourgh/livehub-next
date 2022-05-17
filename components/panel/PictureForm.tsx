import { IBand } from "interfaces/Band";
import FileField from "./FileField";
import { Form } from "react-final-form";

interface IPictureFormProps {
  band: Partial<IBand> | null;
  token: string,
  editing: boolean
}

const PictureForm = ({ band, token }: IPictureFormProps) => {
    const onSubmit = async (values: any) =>{
      console.log("submit")
        console.log(values.image[0]) 
        const dataSend= new FormData()
        dataSend.append("image", values.image[0] )
        if(band){
          console.log(band.id)
          dataSend.append("band", band.id?band.id:"")
        }
        const response = await fetch("api/bands/changePicture", {
            body: dataSend,
            headers: {"authorization": `Bearer ${token}`}, 
            method: "POST",
        })
        console.log(response)
    }
    const validate = () => {

    }
  return (
    <Form
      onSubmit={onSubmit}
      validate={() => validate}
      render={({ handleSubmit, values }) => (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Upload image</label>
                    <FileField id="image" hidden name="image"></FileField>
                </div>
                <button type="submit">Change Image</button>
            </form>
        </div>
      )}
    />
  );
};
export default PictureForm;
