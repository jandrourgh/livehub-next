import { IBand } from "interfaces/Band";
import { Form, Field, FormSpy } from 'react-final-form'
import { HexColorPicker } from "react-colorful";
import ThemePreview from "./ThemePreview";
import HexColorPickerAdapter from "./HexColorPickerAdapter";
import Image from 'next/image'
import FileField from "./FileField";
import {getFormData} from "helpers/forms/ObjectToFormData"

interface BandFormProps {
    band: IBand | null,
    token: string,
    editing: boolean
}

const BandForm = ({band, token, editing}: BandFormProps)=>{
    const onSubmit = async (values: any) =>{
        const response = await fetch("api/bands/save", {
            body: JSON.stringify({...values, id: editing?band?.id:undefined,}),
            method: "POST",
            headers: {"authorization": `Bearer ${token}`}
        })
        console.log(response)
    }
    const validate = () => {

    }
    return(
    <div>
        <Form
            onSubmit={onSubmit}
            validate={()=>validate}
            render={({handleSubmit, values}) => (
                <form onSubmit={handleSubmit}>
                    <h2>New band</h2>
                    <div>
                        <h3>Band Info</h3>
                        <div>
                            <label htmlFor="name">Band Name</label>
                            <Field name="name" initialValue={band?.name} id="name" type="text" component="input"/>
                        </div>
                        <div>
                            <label htmlFor="genres">Genres (comma separated)</label>
                            <Field name="genres" initialValue={band?.genres.join(", ")} id="genres" type="text" component="input"></Field>
                        </div>
                        <div>
                            <label htmlFor="description">Band description</label>
                            <Field name="description" initialValue={band?.description} id="description" component="textarea"></Field>
                        </div>
                        <div>
                            {/* <Image alt="" src=""></Image> */}
                        </div>
                    </div>
                    <div>
                        <h3>Theme Settings</h3>
                        <div>
                            <label>Primary Color</label>
                            <Field 
                                name="primary"
                                initialValue={band?.theme.primary}
                                component={HexColorPickerAdapter}
                                >
                            </Field>
                            <label>Secondary Color</label>
                            <Field
                                name="secondary"
                                initialValue={band?.theme.secondary}
                                component={HexColorPickerAdapter}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor="borders">Borders</label>
                            <Field name="borders" initialValue={band?.theme.borders} id="borders" component="input" type="checkbox"></Field>
                        </div>
                        <div>
                            <label htmlFor="round">Rounded corners</label>
                            <Field name="round" id="round" initialValue={band?.theme.rounded} component="input" type="checkbox"></Field>
                        </div>
                        <div>
                            <label htmlFor="backdrop">Backdrop</label>
                            <Field name="backdrop" id="backdrop" initialValue={band?.theme.backdrop} component="input" type="checkbox"></Field>
                        </div>
                        <div>
                            <label htmlFor="opacity">Background Opacity</label>
                            <Field name="opacity" id="opacity" initialValue={band?.theme.opacity} component="input" type="range" min={0} max={1} step={0.1}></Field>
                        </div>
                    </div>
                    <div>
                        <h3>Preview</h3>
                        <ThemePreview theme={{
                            primary: values.primary, 
                            secondary: values.secondary,
                            backdrop: values.backdrop,
                            borders: values.borders,
                            rounded: values.rounded,
                            opacity: values.opacity    
                        }}></ThemePreview>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )} 
        />

    </div>
   )
}

export default BandForm