import { ITheme } from "interfaces/Theme"
import React from "react"
import hexToRgba from 'hex-to-rgba'

interface IThemePreviewProps {
    theme: ITheme

}

const ThemePreview = ({theme}:IThemePreviewProps) => {

    console.log(theme)

    return (<>
        <div className="container p-3 my-4" style={{color:theme.primary, backgroundImage: theme.imgUrl?`url("${theme.imgUrl}")`:"fa", backgroundSize:"cover"}}>
            <h1>{theme.name?theme.name:"Lorem Ipsum"}</h1>
            <div className="row p-3" style={{ }}>
                <div className="col-8 p-3 m-auto" style={{
                    background: theme.secondary&&theme.opacity?hexToRgba(theme.secondary, theme.opacity):"transparent", 
                    backdropFilter: theme.backdrop?"blur(2px)":"none",
                    border:theme.borders?`1px solid ${theme.primary}`:"none",
                    borderRadius: theme.rounded?'16px':"0",

                    }}>
                    <p>{theme.description?theme.description: "Lorem Ipsum"}</p>
                </div>
            </div>
        </div>
    </>)
}

export default ThemePreview