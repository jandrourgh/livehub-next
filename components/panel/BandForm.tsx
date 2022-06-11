import { IBand } from "interfaces/Band";
import { Form, Field } from "react-final-form";
import ThemePreview from "./ThemePreview";
import HexColorPickerAdapter from "./HexColorPickerAdapter";
import React, { useEffect, useRef } from "react";
import { FormApi } from "final-form";

interface BandFormProps {
  band: Partial<IBand> | null;
  token: string;
  editing: boolean;
  updateBand: (band: IBand) => void;
  closeModal: (evt: React.MouseEvent<HTMLButtonElement>)=>void
}

const BandForm = ({ band, token, editing, updateBand, closeModal }: BandFormProps) => {
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
              const bandArgs: IBand = args[0];
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
            <form onSubmit={handleSubmit} className="container p-2">
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  <h2>
                    {editing ? `Editing band ${band?.name}` : "Uploading band"}
                  </h2>
                  <button className="btn btn-danger"onClick={(evt)=>closeModal(evt)}>Close</button>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h3>Band Info</h3>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Band Name</label>
                  <Field name="name" id="name" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="genres">Genres (comma separated)</label>
                  <Field
                    name="genres"
                    id="genres"
                    type="text"
                    className="form-control"
                    component="input"
                  ></Field>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="description">Band description</label>
                  <Field
                    name="description"
                    id="description"
                    component="textarea"
                    className="form-control"
                  ></Field>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h3>Theme Settings</h3>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div className="p-2">
                    <label className="form-label">Primary Color</label>
                    <Field
                      name="primary"
                      component={HexColorPickerAdapter}
                    ></Field>
                  </div>
                  <div className="p-2">
                    <label className="form-label">Secondary Color</label>
                    <Field
                      name="secondary"
                      component={HexColorPickerAdapter}
                    ></Field>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="borders">Borders</label>
                    <Field
                      name="borders"
                      id="borders"
                      component="input"
                      type="checkbox"
                      className="form-check-input"

                    ></Field>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="rounded">Rounded corners</label>
                    <Field
                      name="rounded"
                      id="rounded"
                      component="input"
                      type="checkbox"
                      className="form-check-input"
                    ></Field>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="backdrop">Backdrop</label>
                    <Field
                      name="backdrop"
                      id="backdrop"
                      component="input"
                      type="checkbox"
                      className="form-check-input"
                    ></Field>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="opacity">Background Opacity</label>
                    <Field
                      name="opacity"
                      id="opacity"
                      component="input"
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      className="form-range"
                    ></Field>
                  </div>
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
                    name: values.name,
                    imgUrl: band?.imgUrl,
                    description: values.description,
                  }}
                ></ThemePreview>
              </div>
              <div>
                <button className="btn btn-dark"type="submit">Submit</button>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

export default BandForm;
