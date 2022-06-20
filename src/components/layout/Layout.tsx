import * as React from 'react'
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav'
import '../../styles/Layout.css'
import ThemeProvider from '../../contexts/ThemeContext'

interface Props {
  menu?: boolean
}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  menu,
  children,
}) => {
  return (
    <ThemeProvider>
      <div className="Layout">
        <Header />
        <div className="d-flex flex-row">
          {menu ? <Nav /> : null}
          <div className="content flex-grow-1">{children}</div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
