import React, { useCallback, useRef, useState } from 'react'
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
} from 'react-bootstrap'
import FeedbackText, { IFeedback } from '../utils/FeedbackText'
import * as yup from 'yup'
import './FormSettings.css'
import { IUser } from '../login/IUser'
import { IResultStatus } from '../../backend'

const feedbackDefault = {
  icon: 'bi bi-exclamation-circle-fill',
  message: 'Digite as informações pedidas',
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
  senha: yup.string().required().label('Senha'),
  login: yup.string().required().label('Login'),
})

const FormSettings: React.FC = () => {
  const [feedback, setFeedback] = useState<IFeedback>()
  const [editar, setEditar] = useState<boolean>(false)
  const loginRef = useRef<HTMLInputElement>(null)
  const senhaRef = useRef<HTMLInputElement>(null)

  const handleSalvar = useCallback(() => {
    const user = {
      login: loginRef.current!.value,
      senha: senhaRef.current!.value,
    }

    schema
      .validate(user)
      .then(user => {
        window.Main.sendMessage('login', { user, newLogin: true })
        window.Main.on('login', (_: any, resp: IResultStatus<IUser>) => {
          setFeedback({
            icon:
              resp.status === 'error'
                ? 'bi bi-exclamation-circle-fill'
                : 'bi bi-check2-circle',
            message: resp.message,
            color: resp.status === 'error' ? 'text-danger' : 'text-success',
          })
          setEditar(false)
        })
      })
      .catch((err: yup.ValidationError) => {
        setFeedback({
          icon: 'bi bi-exclamation-triangle-fill',
          message: err.errors,
          color: 'text-danger',
        })
      })
  }, [loginRef, senhaRef])

  return (
    <Form className="Form text-light">
      <Row className="mb-5">
        <Col className="col-2">
          <FormLabel>Login:</FormLabel>
        </Col>
        <Col className="col-10">
          <FormControl disabled={!editar} ref={loginRef}></FormControl>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="col-2">
          <FormLabel>Senha:</FormLabel>
        </Col>
        <Col className="col-10">
          <FormControl
            type="password"
            disabled={!editar}
            ref={senhaRef}
          ></FormControl>
        </Col>
      </Row>
      <Row className="mb-5">
        <FeedbackText feedback={feedback} />
        {!editar ? (
          <Button className='mt-2' variant="warning" onClick={() => setEditar(true)}>
              Editar
            </Button>
        ) : (
          <div className='mt-2 d-flex justify-content-between'>
            <Button className='flex-grow-1 mx-2' variant="danger" onClick={() => {
                setEditar(false)
                setFeedback(undefined)
            }}>
              Cancelar
            </Button>
            <Button className='flex-grow-1 mx-2' variant="primary" onClick={handleSalvar}>
              Salvar
            </Button>
          </div>
        )}
      </Row>
    </Form>
  )
}

export default FormSettings
