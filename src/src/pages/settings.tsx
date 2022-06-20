import React, { useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import Layout from '../components/layout/Layout'
import FormSettingsLogin from '../components/settings/FormSettingsLogin'
import FormTheme from '../components/settings/FormTheme'

type Telas = 'login' | 'tema'

const Settings: React.FC = () => {
  const [tela, setTela] = useState<Telas>()
  return (
    <Layout menu>
      <div className="container d-flex flex-column justify-content-center h-100">
        <h1 className="text-light text-center my-3">Configurações</h1>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <ButtonGroup className='w-100 mb-4'>
              <button className='mx-2 btn btn-outline-warning' onClick={() => setTela('login')}>Login</button>
              <button className='btn btn-outline-warning' onClick={() => setTela('tema')}>Tema</button>
            </ButtonGroup>
            {tela === 'login' && <FormSettingsLogin />}
            {tela === 'tema' && <FormTheme/>}
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
