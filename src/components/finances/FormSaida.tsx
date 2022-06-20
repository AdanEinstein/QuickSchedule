import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Button, FloatingLabel, Form, FormControl } from 'react-bootstrap'
import FeedbackText, { IFeedback } from '../utils/FeedbackText'
import * as yup from 'yup'
import { IFinance, IResultStatus } from '../../backend'
import { useFinance } from '../../contexts/FinancesContext'
import { generate } from 'shortid'

const feedbackDefault: IFeedback = {
  icon: 'bi bi-info-circle-fill',
  message: 'Digite as informações corretamente!',
  color: 'text-primary',
}

yup.setLocale({
  mixed: {
    required(params) {
      return `${params.path} não foi preenchido!`
    },
  },
})

const schema = yup.object().shape({
  descricao: yup.string().required().label('Descrição'),
  valor: yup.string().required().label('Valor'),
})

const FormSaida: React.FC = () => {
  const { ano, mes, setMes, setAno } = useFinance()
  const [feedback, setFeedback] = useState<IFeedback>()
  const [valor, setValor] = useState<string>('0,00')
  const [descricao, setDescricao] = useState<string>('')
  const descricaoRef = useRef<HTMLInputElement>(null)
  const valorRef = useRef<HTMLInputElement>(null)

  const handleFormatPrice = useCallback(
    (e: ChangeEvent) => {
      const val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
      const valFixed = `${(parseInt(val) / 100).toFixed(2)}`
      if (val.length < 18) {
        const result = valFixed
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        setValor(isNaN(parseInt(val) / 100) ? '0,00' : result)
      }
    },
    [valor]
  )

  const handleConfirmar = useCallback(() => {
    const descricao = descricaoRef.current?.value
    const valor = valorRef.current?.value
    const dataAtual = new Date()

    const saida = {
      descricao,
      valor,
    }

    schema
      .validate(saida)
      .then(saida => {
        window.Main.sendMessage('newfinance', {
          finance: {
            id: generate(),
            ...saida,
            tipo: 'saida',
            data: `${dataAtual.getDate()}/${
              dataAtual.getMonth() + 1 < 10 && '0'
            }${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`,
          },
          ano,
          mes,
        })
        window.Main.on(
          'newfinance',
          (_: any, resp: IResultStatus<IFinance>) => {
            if (resp.status === 'error') {
              setFeedback({
                icon: 'bi bi-exclamation-triangle-fill',
                message: resp.message,
                color: 'text-danger',
              })
            } else {
              setFeedback({
                icon: 'bi bi-check2-circle',
                message: resp.message,
                color: 'text-success',
              })
            }
          }
        )
        setDescricao('')
        setValor('0,00')
      })
      .catch((err: yup.ValidationError) => {
        setFeedback({
          icon: 'bi bi-exclamation-triangle-fill',
          message: err.errors,
          color: 'text-danger',
        })
      })
  }, [descricaoRef, valorRef])

  useEffect(() => {
    descricaoRef.current?.focus()
    setAno(`${new Date().getFullYear()}`)
    setMes(
      `${new Date().getMonth() + 1 < 10 && '0'}${new Date().getMonth() + 1}`
    )
  }, [feedback])

  return (
    <div className="w-100">
      <h2 className="text-light mb-4">Lance aqui sua saída!</h2>
      <Form>
        <FloatingLabel className="mb-3 w-100" label="Descrição da saída">
          <FormControl
            placeholder="Descrição"
            type="text"
            ref={descricaoRef}
            value={descricao}
            onChange={(e: ChangeEvent) => {
              setDescricao((e.target as HTMLInputElement).value)
            }}
          />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Valor R$">
          <FormControl
            placeholder="Valor"
            type="text"
            ref={valorRef}
            value={valor}
            onChange={handleFormatPrice}
          />
        </FloatingLabel>
        <FeedbackText feedback={feedback} />
        <Button className="w-100 mt-2" variant="success" onClick={handleConfirmar}>
          Confirmar
        </Button>
      </Form>
    </div>
  )
}

export default FormSaida
