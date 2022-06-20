import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { FloatingLabel, FormControl, FormSelect } from 'react-bootstrap'
import { IFinance, IResultStatus } from '../../backend'
import ModalCenter from '../layout/ModalCenter'
import * as yup from 'yup'
import FeedbackText, { IFeedback } from '../utils/FeedbackText'
import { useFinance } from '../../contexts/FinancesContext'

export interface ITargetFinanceList {
  finance: IFinance
  estado: 'editar' | 'deletar'
}

export interface IAcoes {
  target?: ITargetFinanceList
  showModal?: boolean
  setTarget(arg: ITargetFinanceList): void
  setShowModal(arg: boolean): void
}

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
  tipo: yup.string().required().label('Tipo'),
})

const FormAcoes: React.FC<IAcoes> = ({
  setShowModal,
  showModal,
  setTarget,
  target,
}) => {
  const { ano, mes } = useFinance()
  const [feedback, setFeedback] = useState<IFeedback>()
  const descricaoRef = useRef<HTMLInputElement>(null)
  const valorRef = useRef<HTMLInputElement>(null)
  const tipoRef = useRef<HTMLSelectElement>(null)

  const handleConfirmar = useCallback(() => {
    const financeValidate = {
      descricao: descricaoRef.current?.value,
      valor: valorRef.current?.value,
      tipo: tipoRef.current?.value,
    }

    const finance: IFinance = {
      ...target?.finance,
      descricao: financeValidate.descricao,
      tipo: financeValidate.tipo,
      valor: financeValidate.valor,
    }

    schema
      .validate(financeValidate)
      .then(() => {
        const message =
          target?.estado === 'editar' ? 'editfinance' : 'deletefinance'
        window.Main.sendMessage(message, {
          finance: { ...finance },
          ano,
          mes,
        })
        window.Main.on(message, (_: any, resp: IResultStatus<IFinance>) => {
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
            setShowModal(false)
          }
        })
      })
      .catch((err: yup.ValidationError) => {
        setFeedback({
          icon: 'bi bi-exclamation-triangle-fill',
          message: err.errors,
          color: 'text-danger',
        })
      })
  }, [])

  return (
    <ModalCenter
      show={showModal}
      cor={target?.estado === 'editar' ? 'warning' : 'danger'}
      labelbutton={target?.estado === 'editar' ? 'Editar' : 'Deletar'}
      onHide={() => setShowModal(false)}
      titulo={
        target?.estado === 'editar'
          ? 'Editando lançamento'
          : 'Deletando lançamento'
      }
      onConfirm={handleConfirmar}
    >
      <FloatingLabel className="mb-3" label="Descrição">
        <FormControl
          disabled={target?.estado === 'deletar'}
          placeholder="Descrição"
          type="text"
          value={target?.finance.descricao}
          onChange={(e: ChangeEvent) =>
            setTarget({
              finance: {
                ...target?.finance,
                descricao: (e.target as HTMLInputElement).value,
              },
              estado: 'editar',
            })
          }
          ref={descricaoRef}
        />
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="Valor R$">
        <FormControl
          disabled={target?.estado === 'deletar'}
          placeholder="R$"
          type="text"
          value={target?.finance.valor}
          onChange={(e: ChangeEvent) => {
            const val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
            const valFixed = `${(parseInt(val) / 100).toFixed(2)}`
            if (val.length < 18) {
              const result = valFixed
                .replace('.', ',')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
              setTarget({
                finance: {
                  ...target?.finance,
                  valor: isNaN(parseInt(val) / 100) ? '0,00' : result,
                },
                estado: 'editar',
              })
            }
          }}
          ref={valorRef}
        />
      </FloatingLabel>
      <FloatingLabel className="mb-3" label="Tipo">
        <FormSelect
          disabled={target?.estado === 'deletar'}
          value={target?.finance.tipo}
          onChange={(e: ChangeEvent) =>
            setTarget({
              finance: {
                ...target?.finance,
                tipo: (e.target as HTMLInputElement).value,
              },
              estado: 'editar',
            })
          }
          ref={tipoRef}
        >
          <option value="">Selecione o tipo</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </FormSelect>
      </FloatingLabel>
      <FeedbackText feedback={feedback} />
    </ModalCenter>
  )
}

export default FormAcoes
