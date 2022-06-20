import React, { memo, MouseEvent, useCallback, useEffect, useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { useTheme } from '../../contexts/ThemeContext'
import './ButtonFinances.css'

export type Telas = 'entrada' | 'saida' | 'null'

interface ITelas{
  telaAtual(tela: Telas): void
}

const ButtonFinances: React.FC<ITelas> = ({telaAtual}) => {
  const { font, theme } = useTheme()
  const [targetButton, setTargetButton] = useState<Telas>('null')

  useEffect(() => {
    telaAtual(targetButton)
  },[targetButton])

  const handleToggle = useCallback(
    (event: MouseEvent) => {
      const button = (event.target as HTMLButtonElement)!.name as Telas
      setTargetButton(oldTarget => {
        if (oldTarget === 'null') return button
        else if(oldTarget !== button) return button
        else return 'null'
      })
    },
    [targetButton]
  )

  return (
    <ButtonGroup className="d-flex justify-content-center mb-3">
      <button
        name="entrada"
        className="Botao ButtonFinances flex-grow-1"
        style={
          targetButton !== 'entrada'
            ? {
                background: `var(--bg-color-${theme})`,
                color: `var(--color-${font})`,
              }
            : { background: '#EFF', color: '#222' }
        }
        onClick={handleToggle}
      >
        Entrada
      </button>
      <button
        name="saida"
        className="Botao ButtonFinances flex-grow-1"
        style={
          targetButton !== 'saida'
            ? {
                background: `var(--bg-color-${theme})`,
                color: `var(--color-${font})`,
              }
            : { background: '#EFF', color: '#222' }
        }
        onClick={handleToggle}
      >
        Saída
      </button>
    </ButtonGroup>
  )
}

export default memo(ButtonFinances)
