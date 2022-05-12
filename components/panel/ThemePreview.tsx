import { ITheme } from "interfaces/Theme"

interface IThemePreviewProps {
    theme: ITheme

}

const ThemePreview = ({theme}:IThemePreviewProps) => {
    return (<><h1>{theme.primary}</h1></>)
}

export default ThemePreview