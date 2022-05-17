import { IBand } from "interfaces/Band";
import { Form, Field } from "react-final-form";
import ThemePreview from "./ThemePreview";
import HexColorPickerAdapter from "./HexColorPickerAdapter";
import { useEffect, useRef } from "react";
import { FormApi } from "final-form";

interface BandFormProps {
  band: Partial<IBand> | null;
  token: string;
  editing: boolean;
  updateBand: (band: IBand) => void
}

const BandForm = ({ band, token, editing, updateBand }: BandFormProps) => {
  const formState = useRef<null | FormApi>(null);
  useEffect(() => {
    console.log("band changed", band);
    if (formState.current != null) {
      formState.current.mutators.setValues(band);
    }
  }, [band]);
  const onSubmit = async (values: any) => {
    const response = await fetch("api/bands/save", {
      body: JSON.stringify({ ...values, id: editing ? band?.id : undefined }),
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    });
    const submittedBand: {message: string, band: IBand}= await response.json()
    if(response.ok){
        updateBand(submittedBand.band)
    }
    
  };
  const setFormState = (form: FormApi) => {
    formState.current = form;
  };
  const validate = () => {};
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        mutators={{
          setValues: (args, state, { changeValue }) => {
            //console.log("llamando a setvalues")
            //console.log(args)
            if (args[0] !== null) {
              let bandArgs: IBand = args[0];
              console.log(bandArgs);
              changeValue(state, "name", () => bandArgs.name);
              changeValue(state, "genres", () => bandArgs.genres.join(", "));
              changeValue(state, "description", () => bandArgs.description);
              changeValue(state, "primary", () => bandArgs.theme.primary);
              changeValue(state, "secondary", () => bandArgs.theme.secondary);
              changeValue(state, "borders", () => bandArgs.theme.borders);
              changeValue(state, "rounded", () => bandArgs.theme.rounded);
              changeValue(state, "backdrop", () => bandArgs.theme.backdrop);
              changeValue(state, "opacity", () => bandArgs.theme.opacity);
            }
          },
        }}
        validate={() => validate}
        render={({ form, handleSubmit, values }) => {
          setFormState(form);
          return (
            <form onSubmit={handleSubmit}>
              <h2>
                {editing ? `Editing band ${band?.name}` : "Uploading band"}
              </h2>
              <div>
                <h3>Band Info</h3>
                <div>
                  <label htmlFor="name">Band Name</label>
                  <Field name="name" id="name" type="text" component="input" />
                </div>
                <div>
                  <label htmlFor="genres">Genres (comma separated)</label>
                  <Field
                    name="genres"
                    id="genres"
                    type="text"
                    component="input"
                  ></Field>
                </div>
                <div>
                  <label htmlFor="description">Band description</label>
                  <Field
                    name="description"
                    id="description"
                    component="textarea"
                  ></Field>
                </div>
              </div>
              <div>
                <h3>Theme Settings</h3>
                <div>
                  <label>Primary Color</label>
                  <Field
                    name="primary"
                    component={HexColorPickerAdapter}
                  ></Field>
                  <label>Secondary Color</label>
                  <Field
                    name="secondary"
                    component={HexColorPickerAdapter}
                  ></Field>
                </div>
                <div>
                  <label htmlFor="borders">Borders</label>
                  <Field
                    name="borders"
                    id="borders"
                    component="input"
                    type="checkbox"
                  ></Field>
                </div>
                <div>
                  <label htmlFor="rounded">Rounded corners</label>
                  <Field
                    name="rounded"
                    id="rounded"
                    component="input"
                    type="checkbox"
                  ></Field>
                </div>
                <div>
                  <label htmlFor="backdrop">Backdrop</label>
                  <Field
                    name="backdrop"
                    id="backdrop"
                    component="input"
                    type="checkbox"
                  ></Field>
                </div>
                <div>
                  <label htmlFor="opacity">Background Opacity</label>
                  <Field
                    name="opacity"
                    id="opacity"
                    component="input"
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                  ></Field>
                </div>
              </div>
              <div>
                <h3>Preview</h3>
                <ThemePreview
                  theme={{
                    primary: values.primary,
                    secondary: values.secondary,
                    backdrop: values.backdrop,
                    borders: values.borders,
                    rounded: values.rounded,
                    opacity: values.opacity,
                  }}
                ></ThemePreview>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

export default BandForm;
