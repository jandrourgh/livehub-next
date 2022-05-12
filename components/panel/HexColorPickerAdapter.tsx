import { HexColorPicker } from "react-colorful"
import {  } from "react-final-form"

const HexColorPickerAdapter = ({input}: any) => {
    return <HexColorPicker onChange={(newColor)=>input.onChange(newColor)}></HexColorPicker>
}
export default HexColorPickerAdapter