import * as React from 'react'
import { Button, FloatingLabel, Form, FormControl } from 'react-bootstrap'
import './FormLogin.css'
import * as yup from 'yup'
import FeedbackText, { IFeedback } from '../utils/FeedbackText'
import { IUser } from './IUser'
import { IResultStatus } from '../../backend'
import { useNavigate } from 'react-router-dom'

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
  senha: yup.string().required().label('Senha'),
  login: yup.string().required().label('Login'),
})

const FormLogin: React.FC = () => {
  const navigate = useNavigate()
  const [feedback, setFeedback] = React.useState<IFeedback>()
  const loginRef = React.useRef<HTMLInputElement>(null)
  const senhaRef = React.useRef<HTMLInputElement>(null)

  const handleEntrar = React.useCallback(() => {
    const user: IUser = {
      login: loginRef.current!.value,
      senha: senhaRef.current!.value,
    }
    schema
      .validate(user)
      .then(user => {
        window.Main.sendMessage('login', {user, newLogin: false})
        window.Main.on('login', (_: any, resp: IResultStatus<IUser>) => {
          if (resp.message) {
            setFeedback({
              icon:
                resp.status === 'error'
                  ? 'bi bi-exclamation-circle-fill'
                  : 'bi bi-check2-circle',
              message: resp.message,
              color: resp.status === 'error' ? 'text-danger' : 'text-success',
            })
          } else {
            const userData = resp.data
            const valid =
              user.login === userData?.login && user.senha === userData.senha ? true : false
            if (valid) {
              setFeedback({
                icon: 'bi bi-check2-circle',
                message: 'Login válido!',
                color: 'text-success',
              })
              navigate('/home')
            } else {
              setFeedback({
                icon: 'bi bi-exclamation-circle-fill',
                message: 'Login inválido!',
                color: 'text-danger',
              })
            }
          }
        })
      })
      .catch((err: yup.ValidationError) => {
        setFeedback({
          icon: 'bi bi-exclamation-circle-fill',
          message: err.errors,
          color: 'text-danger',
        })
      })
  }, [feedback, loginRef, senhaRef])

  React.useEffect(() => {
    loginRef.current?.focus()
  }, [])

  return (
    <div className="col-md-6 col-10">
      <h2 className="text-light mb-4">Para entrar efetue o seu login!</h2>
      <Form>
        <FloatingLabel className="mb-3 w-100" label="Login">
          <FormControl placeholder="Login" type="text" ref={loginRef} />
        </FloatingLabel>
        <FloatingLabel className="mb-3" label="Senha">
          <FormControl placeholder="Senha" type="password" ref={senhaRef} />
        </FloatingLabel>
        <FeedbackText feedback={feedback} />
        <Button className="w-100 mt-2" variant="success" onClick={handleEntrar}>
          Entrar
        </Button>
      </Form>
    </div>
  )
}

export default FormLogin
