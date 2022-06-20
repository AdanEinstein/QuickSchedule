import React from 'react'
import FinancesProvider from '../contexts/FinancesContext'
import LayoutFinances from '../components/finances/LayoutFinances'

const Finances: React.FC = () => {
  return (
    <FinancesProvider>
      <LayoutFinances/>
    </FinancesProvider>
  )
}

export default Finances
