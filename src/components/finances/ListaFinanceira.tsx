import React, { useCallback, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { IFinance, IResultStatus } from '../../backend'
import { useFinance } from '../../contexts/FinancesContext'
import FormAcoes, { ITargetFinanceList } from './FormAcoes'
import './ListaFinanceira.css'

const ListaFinanceira: React.FC<{ dia?: string }> = ({ dia }) => {
  const { ano, setAno, mes, setMes, finances, setFinances } = useFinance()
  const [total, setTotal] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [target, setTarget] = useState<ITargetFinanceList>()

  useEffect(() => {
    window.Main.sendMessage('finance', { ano, mes })
    window.Main.on('finance', (_: any, resp: IResultStatus<IFinance[]>) => {
      resp.data && setFinances(resp.data)
    })
  }, [ano, mes, showModal])

  const handleListEdit = useCallback(
    (finance: IFinance) => {
      setTarget({ finance, estado: 'editar' })
      setShowModal(true)
    },
    [target, showModal]
  )

  const handleListDelete = useCallback(
    (finance: IFinance) => {
      setTarget({ finance, estado: 'deletar' })
      setShowModal(true)
    },
    [target, showModal]
  )

  const orderByDate = (financeA: IFinance, financeB: IFinance): number => {
    const [diaA] = financeA.data!.split('/')
    const [diaB] = financeB.data!.split('/')
    const diaNumA = parseInt(diaA)
    const diaNumB = parseInt(diaB)
    if (diaNumA > diaNumB) return -1
    else if (diaNumA < diaNumB) return 1
    else return 0
  }

  const filterDate = (finance: IFinance): boolean => {
    if (dia) {
      const [diaFinance] = finance.data!.split('/')
      if (diaFinance === dia) return true
      else return false
    } else {
      return true
    }
  }

  useEffect(() => {
    const totalCalculado = finances
      ?.filter(filterDate)
      .sort(orderByDate)
      .map(finance => {
        return finance.tipo === 'entrada'
          ? parseFloat(
              (finance?.valor as string).replace('.', '').replace(',', '.')
            )
          : -parseFloat(
              (finance?.valor as string).replace('.', '').replace(',', '.')
            )
      })
      ?.reduce((acc, atual) => (acc += atual), 0)
    setTotal(
      totalCalculado?.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })
    )
  }, [finances, dia])

  return (
    <div className="w-100">
      {finances?.length === 0 ? (
        <h2 className="text-center text-light mb-4">
          Listagem vazia neste mês!
        </h2>
      ) : (
        <div className="Table">
          <h3 className="text-center text-light mb-4">
            Visão geral das sua finanças de {dia ? `${dia}/${mes}/${ano}` : `${mes}/${ano}`}
          </h3>
          <Table bordered hover variant="light">
            <thead>
              <tr className="table-dark">
                <th>Tipo</th>
                <th className="d-md-table-cell d-none">Data</th>
                <th>Descrição</th>
                <th>Valor R$</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {finances
                ?.filter(filterDate)
                .sort(orderByDate)
                .map(finance => {
                  return (
                    <tr key={finance.id}>
                      <td
                        className={`${
                          finance.tipo === 'entrada'
                            ? 'table-success'
                            : 'table-danger'
                        }`}
                      >
                        {finance.tipo === 'entrada' ? (
                          <span>
                            Entrada <i className="bi bi-check-circle"></i>
                          </span>
                        ) : (
                          <span>
                            Saída <i className="bi bi-x-circle"></i>
                          </span>
                        )}
                      </td>
                      <td className="d-md-table-cell d-none">{finance.data}</td>
                      <td>{finance.descricao}</td>
                      <td>{`R$ ${finance.valor}`}</td>
                      <td className="d-flex justify-content-around">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => handleListEdit(finance)}
                        >
                          <i className="bi bi-pencil-square flex-grow-1 mx-1"></i>
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleListDelete(finance)}
                        >
                          <i className="bi bi-trash-fill flex-grow-1 mx-1"></i>
                        </Button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-white fs-4 fw-light mx-3">
              Faturamento calculado:
            </span>
            <span
              className={`btn mx-2 ${
                total?.startsWith('-') ? 'btn-danger' : 'btn-success'
              } flex-grow-1 fs-4`}
            >
              {total}
            </span>
          </div>
        </div>
      )}
      {showModal && (
        <FormAcoes
          target={target}
          setTarget={setTarget}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </div>
  )
}

export default ListaFinanceira
