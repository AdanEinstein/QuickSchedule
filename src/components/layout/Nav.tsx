import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import '../../styles/Nav.css'

const Nav: React.FC = () => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  const { theme, font } = useTheme()
  const handleOpenMenu = React.useCallback(() => {
    setOpenMenu(!openMenu)
  }, [openMenu])
  return (
    <nav
      className="Nav"
      style={
        openMenu
          ? {
              background: `var(--bg-color-${theme})`,
              color: `var(--color-${font})`,
            }
          : {
              left: '-10rem',
              width: '0',
              background: `var(--bg-color-${theme})`,
              color: `var(--color-${font})`,
            }
      }
    >
      <button onClick={handleOpenMenu} style={{background: `var(--bg-color-${theme})`, color: `var(--color-${font})`}}>
        <span className="text-nowrap m-1">
          Menu <i className="bi bi-list"></i>
        </span>
      </button>
      <Link to={'/schedule'}>Agenda</Link>
      <Link to={'/finances'}>Finanças</Link>
      <Link to={'/settings'}>Configurações</Link>
      <Link to={'/'}>Sair</Link>
    </nav>
  )
}

export default memo(Nav)
