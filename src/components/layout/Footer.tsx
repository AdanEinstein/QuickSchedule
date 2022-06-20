import * as React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "../../styles/Footer.css"

const Footer: React.FC = () => {
    const {theme, font} = useTheme()
    return (
        <footer className='Footer' style={{background: `var(--bg-color-${theme})`, color: `var(--color-${font})`}}>
            <p>App desenvolvido por Adan Einstein</p>
        </footer>
    )
}

export default Footer