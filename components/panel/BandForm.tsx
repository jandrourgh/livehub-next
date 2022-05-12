import { IBand } from "interfaces/Band";
import { Form, Field, FormSpy } from 'react-final-form'
import { HexColorPicker } from "react-colorful";
import ThemePreview from "./ThemePreview";
import HexColorPickerAdapter from "./HexColorPickerAdapter";


interface BandFormProps {
    band: IBand | null
}

const BandForm = ({band}: BandFormProps)=>{
    const onSubmit = () =>{

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
                            <Field name="name" id="name" type="text" component="input"/>
                        </div>
                        <div>
                            <label htmlFor="genres">Genres (comma separated)</label>
                            <Field name="genres" id="genres" type="text" component="input"></Field>
                        </div>
                        <div>
                            <label htmlFor="description">Band description</label>
                            <Field name="description" id="description" component="textarea"></Field>
                        </div>
                    </div>
                    <div>
                        <h3>Theme Settings</h3>
                        <div>
                            <label>Primary Color</label>
                            <Field 
                                name="primary"
                                component={HexColorPickerAdapter}
                                >
                            </Field>
                            <label>Secondary Color</label>
                            <Field
                                name="secondary"
                                component={HexColorPickerAdapter}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor="borders">Borders</label>
                            <Field name="borders" id="borders" component="input" type="checkbox"></Field>
                        </div>
                        <div>
                            <label htmlFor="round">Rounded corners</label>
                            <Field name="round" id="round" component="input" type="checkbox"></Field>
                        </div>
                        <div>
                            <label htmlFor="backdrop">Backdrop</label>
                            <Field name="backdrop" id="backdrop" component="input" type="checkbox"></Field>
                        </div>
                        <div>
                            <label htmlFor="opacity">Background Opacity</label>
                            <Field name="opacity" id="opacity" component="input" type="checkbox"></Field>
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
                </form>
            )} 
        />

    </div>
   )
}

export default BandForm