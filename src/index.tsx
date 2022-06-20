import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/globals.css'
import { HashRouter } from 'react-router-dom'
import Routes from './routes/Routes'

ReactDOM.render(
  <HashRouter>
    <Routes />
  </HashRouter>,
  document.getElementById('root')
)
