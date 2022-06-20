import * as React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import '../../styles/Header.css'

const Header: React.FC = () => {
  const {theme, font} = useTheme()
  
  return (
    <header className={`Header`} style={{background: `var(--bg-color-${theme})`, color: `var(--color-${font})`}}>
      <i className="bi bi-journal-check"></i>
      <h1>Quick Schedule</h1>
    </header>
  )
}

export default Header
