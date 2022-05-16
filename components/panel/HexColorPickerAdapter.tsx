import { HexColorPicker } from "react-colorful"
import {  } from "react-final-form"

const HexColorPickerAdapter = ({input}: any) => {
    return <HexColorPicker color={input.value} onChange={(newColor)=>input.onChange(newColor)}></HexColorPicker>
}
export default HexColorPickerAdapter