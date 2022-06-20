import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import FeedbackText, { IFeedback } from '../utils/FeedbackText'
import * as yup from 'yup'
import { useFinance } from '../../contexts/FinancesContext'
import ButtonFinances, { Telas } from './ButtonFinances'
import Layout from '../layout/Layout'
import { Button, FloatingLabel, FormControl } from 'react-bootstrap'
import FormEntrada from './FormEntrada'
import FormSaida from './FormSaida'
import ListaFinanceira from './ListaFinanceira'

const feedbackDefault: IFeedback = {
  icon: 'bi bi-info-circle-fill',
  message: 'Digite uma data posterior ao ano de 1999!',
  color: 'text-primary',
}

yup.setLocale({
  mixed: {
    required(params) {
      return `${params.path} não foi preenchida!`
    },
  },
  string: {
    matches: 'Data inválida!',
  },
})

const schema = yup.object().shape({
  data: yup
    .string()
    .required()
    .matches(
      /(^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(20[0-9][0-9])$)|(^(0?[1-9]|[12][0-9]|3[01])\/(20[0-9][0-9])$)/
    )
    .label('Data'),
})

const LayoutFinances: React.FC = () => {
  const { setAno, setMes } = useFinance()
  const [showRestaurar, setShowRestaurar] = useState<boolean>(false)
  const [tela, setTela] = useState<Telas>('null')
  const [data, setData] = useState<string>('')
  const [feedback, setFeedback] = useState<IFeedback>(feedbackDefault)
  const dataRef = useRef<HTMLInputElement>(null)

  const handleData = useCallback(
    (e: ChangeEvent) => {
      const date = (e.target as HTMLInputElement).value
      // ^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$
      if (date.length < 11) {
        const result = date
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
          .replace(/(\d{2})(\d{4})$/, '$1/$2')
        setData(result)
      }
    },
    [data]
  )

  const handleRestaurar = useCallback(() => {
    setShowRestaurar(false)
    setData('')
    setAno(`${new Date().getFullYear()}`)
    setMes(
      `${new Date().getMonth() + 1 < 10 && '0'}${new Date().getMonth() + 1}`
    )
  }, [])

  const handleBuscar = useCallback(() => {
    schema
      .validate({ data: data })
      .then(() => {
        const dataArray = data.split('/')
        if (dataArray.length === 3) {
          const [dia, mes, ano] = dataArray
          setAno(ano)
          setMes(mes)
        } else {
          const [mes, ano] = dataArray
          setAno(ano)
          setMes(mes)
        }
        setFeedback({
          icon: 'bi bi-check2-circle',
          message: 'Data válida!',
          color: 'text-success',
        })
        setShowRestaurar(true)
      })
      .catch((err: yup.ValidationError) => {
        console.log('Erro: ', err)
        if (err.type === 'required') {
          setFeedback({
            icon: 'bi bi-exclamation-triangle-fill',
            message: err.errors,
            color: 'text-danger',
          })
        } else {
          setFeedback({
            icon: 'bi bi-exclamation-triangle-fill',
            message: 'Data inválida!',
            color: 'text-danger',
          })
        }
      })
  }, [data])
  return (
    <Layout menu>
      <div className="container d-flex flex-column">
        <h1 className="text-white text-center my-3">Finanças</h1>
        <ButtonFinances telaAtual={setTela} />
        {tela === 'null' && (
          <>
            <div className="d-flex my-2 align-items-stretch">
              <FloatingLabel
                className="flex-grow-1"
                label="Selecione a data para busca"
              >
                <FormControl
                  placeholder="Data"
                  type="text"
                  value={data}
                  onChange={handleData}
                  ref={dataRef}
                />
              </FloatingLabel>
              <div className="d-flex">
                <Button className="mx-3 flex-grow-1" onClick={handleBuscar}>
                  Buscar <i className="bi bi-search"></i>
                </Button>
                {showRestaurar && (
                  <Button
                    className="flex-grow-1"
                    variant="outline-warning"
                    onClick={handleRestaurar}
                    onMouseEnter={(e: MouseEvent) => {
                      ;(e.target as HTMLButtonElement).prepend('Restaurar')
                    }}
                    onMouseLeave={(e: MouseEvent) => {
                        ;(e.target as HTMLButtonElement).innerHTML = '<i class="bi bi-arrow-clockwise"></i>'
                      }}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </Button>
                )}
              </div>
            </div>
            <FeedbackText feedback={feedback} />
          </>
        )}
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="row w-100">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 col-12">
              {tela === 'entrada' && <FormEntrada />}
              {tela === 'saida' && <FormSaida />}
              {tela === 'null' && (
                <ListaFinanceira
                  dia={
                    data.split('/').length === 3
                      ? data.split('/')[0]
                      : undefined
                  }
                />
              )}
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LayoutFinances
