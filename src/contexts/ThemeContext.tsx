import React, { createContext, useContext, useEffect, useState } from "react";
import { IResultStatus } from "../backend";

type Theme = "pink" | "blue" | "green" | 'red' | "light"

type Font = 'dark' | 'light'

interface IProviderProps{
    theme: Theme
    font: Font
    setTheme(arg: Theme): void
    setFont(arg: Font): void
}

export interface IStyle{
    theme: Theme,
    font: Font
}

const styleInitial: IStyle = {
    theme: 'pink',
    font: 'dark'
}

const ThemeContext = createContext<any>(styleInitial)

const ThemeProvider: React.FC = ({children}) => {
    const [theme, setTheme] = useState<Theme>()
    const [font, setFont] = useState<Font>()

    useEffect(() => {
        window.Main.sendMessage('style', {style: styleInitial, newStyle: false})
        window.Main.on('style', (_: any, resp: IResultStatus<IStyle>) => {
            setTheme(resp.data!.theme)
            setFont(resp.data!.font)
        })
    }, [theme, font])
    
    return (
        <ThemeContext.Provider value={{theme, setTheme, font, setFont}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext<IProviderProps>(ThemeContext)

export default ThemeProvider