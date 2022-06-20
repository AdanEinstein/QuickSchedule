import React, {
  createContext,
  memo,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { IFinance, IResultStatus } from '../backend'

const FinancesContext = createContext<any>('')

interface IFinancesContext {
  finances: IFinance[]
  setFinances(arg: IFinance[]): void
  ano: string
  setAno(arg: string): void
  mes: string
  setMes(arg: string): void
}

const FinancesProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [finances, setFinances] = useState<IFinance[]>()
  const [ano, setAno] = useState<string>(`${new Date().getFullYear()}`)
  const [mes, setMes] = useState<string>(
    `${new Date().getMonth() + 1 < 10 && '0'}${new Date().getMonth() + 1}`
  )

  useEffect(() => {
      window.Main.sendMessage('finance', { ano, mes })
      window.Main.on('finance', (_: any, resp: IResultStatus<IFinance[]>) => {
        setFinances(resp.data)
      })
  }, [ano, mes])

  return (
    <FinancesContext.Provider
      value={{ finances, setFinances, ano, setAno, mes, setMes }}
    >
      {children}
    </FinancesContext.Provider>
  )
}

export const useFinance = () => useContext<IFinancesContext>(FinancesContext)

export default memo(FinancesProvider)
